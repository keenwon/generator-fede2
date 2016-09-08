'use strict';

const os = require('os');
const fs = require('fs');
const async = require('async');
const bufferConcat = require('buffer-concat');
const glob = require('glob');

glob('dist/**/*.@(css|js)', function (error, files) {
    if (error) {
        throw error;
    }

    var headerBuf = new Buffer(`/*! \n Build on: ${new Date().toLocaleString()} \n Build by: ${os.userInfo().username} \n Environment: ${process.env.NODE_ENV || ''} \n*/\n`);

    async.map(files, (file, done) => {
        fs.readFile(file, (error, data) => {
            if (error) {
                throw error;
            }

            var fileBuf = bufferConcat([headerBuf, data]);

            fs.writeFile(file, fileBuf, error => {
                if (error) {
                    throw error;
                }

                done();
            });
        });
    });
});