const req = require('supertest');
const mongoose = require('mongoose');
const chai = require('chai');
const app = require('../src');

const expect = chai.expect;
const { article } = require('./mocks');

describe('Test API endpoints for Articles', () => {
	let id;

	before('post a new Article', (done) => {
		req(app)
			.post('/api/articles')
			.set('Accept', 'application/json')
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

	it('should update a Article', (done) => {
		const updatedTitle = 'Nokia 3310';
		req(app)
			.put(`/api/articles/${id}`)
			.set('Accept', 'application/json')
			.send({ ...article, title: updatedTitle })
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body.heading1).to.equal(updatedTitle);
				done();
			});
	});

	it('should delete a specific Article', (done) => {
		req(app)
			.delete(`/api/articles/${id}`)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body._id).to.equal(id);
				done();
			});
	});
});
