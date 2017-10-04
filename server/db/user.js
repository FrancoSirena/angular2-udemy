var rs = require('jsrsasign');
require('firebase/database');
var db = require('./connection.js');
var firebaseConfig = require('./../config/firebase.js');
var jwtConfig = require('./../config/jwt.js');

module.exports = {
    signUp: (credentials) => {
        return new Promise((resolve, reject) => {
            db.auth().signInWithEmailAndPassword(firebaseConfig.auth.email, firebaseConfig.auth.password).then(function() {
                var root = db.database().ref();
                var users = root.child('users');
                users.orderByChild('username').equalTo(credentials.username)
                    .once("value")
                    .then(resp => {
                        if (resp.val())
                            reject();
                        else {
                            var newUser = users.push();
                            
                            newUser.set(credentials)
                                .then(function(){
                                    db.auth().signOut().then(function() {
                                        resolve();
                                    });
                                });
                        }
                    })
            })
        });
    },
    authenticate: (credentials) => {
        return new Promise((resolve, reject) => {
                db.auth().signInWithEmailAndPassword(firebaseConfig.auth.email, firebaseConfig.auth.password).then(function() {
                var root = db.database().ref();
                var users = root.child('users');
                users.orderByChild('username').equalTo(credentials.username)
                    .once("value")
                    .then(resp => {
                        if (resp.val()) {
                            var oHeader = {alg: "HS256"};
                            var sHeader = JSON.stringify(oHeader);
                            var sPayload = credentials;
                            sPayload.exp = Math.round(new Date().getTime()/1000) + 20;
                        
                            var sJWS = rs.jws.JWS.sign("HS256", sHeader, sPayload, jwtConfig.privateKey.toString('hex'));
                            resolve(sJWS);
                        } else {
                            reject();
                        }
                    })
                    .catch((err) => {
                        reject();
                    });
            });
        });
    }
}