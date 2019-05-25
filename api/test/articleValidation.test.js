const req = require('supertest');
const chai = require('chai');
const app = require('../src');

const expect = chai.expect;

describe('Test Validation Methods for Articles', () => {
	const token = process.env.TOKEN;

	it('should return 400 for a request without a body', (done) => {
		req(app)
			.post('/api/protected/articles')
			.set({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			})
			.send({})
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if(err) return done(err);
				expect(res.status).to.equal(400);
				expect(res.body.message).to.contain('"body" is required');
				done();
			});
	});
});
