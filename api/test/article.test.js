const req = require('supertest');
const mongoose = require('mongoose');
const chai = require('chai');
const app = require('../src');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../src/api/utils');

const expect = chai.expect;
const { article } = require('./mocks');

describe('Test API endpoints for Articles', () => {
	let id;
	const token = process.env.TOKEN;

	before('login and post a new Article', (done) => {
		req(app)
			.post('/api/protected/articles')
			.set({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			})
			.send(article)
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(201);
				expect(res.body.heading1).to.equal(article.heading1);
				expect(res.body).to.have.property('_id');
				expect(res.body).to.have.property('dateCreated');
				id = res.body._id;
				done();
			});
	});

	after('drop the database', (done) => {
		mongoose.connection.db.dropDatabase(done);
	});

	it('should throw a 401 Error if Unauthorized', (done) => {
		req(app)
			.post('/api/protected/articles')
			.set('Accept', 'application/json')
			.send(article)
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(401);
				expect(res.body.message).to.equal(UNAUTHORIZED_ERROR_MESSAGE);
				done();
			});
	});

	it('should get all Articles', (done) => {
		req(app)
			.get('/api/articles')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.have.lengthOf(1);
				expect(res.body[0].heading1).to.equal(article.heading1);
				done();
			});
	});

	it('should get a specific Article', (done) => {
		req(app)
			.get(`/api/articles/${id}`)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body.heading1).to.equal(article.heading1);
				done();
			});
	});

	it('should throw 404 if a specific Article is Not Found', (done) => {
		req(app)
			.get('/api/articles/ff69418b544d7ff0ff78e2ff')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(404);
				done();
			});
	});	

	it('should update an Article', (done) => {
		const updatedHeading1 = 'Nokia 3310';
		req(app)
			.put(`/api/protected/articles/${id}`)
			.set({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			})
			.send({ ...article, heading1: updatedHeading1 })
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body.heading1).to.equal(updatedHeading1);
				done();
			});
	});

	it('should delete a specific Article', (done) => {
		req(app)
			.delete(`/api/protected/articles/${id}`)
			.set({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			})
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body._id).to.equal(id);
				done();
			});
	});
});
