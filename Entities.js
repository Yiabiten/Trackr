var mongoose = require('mongoose');
var issueSchema = new mongoose.Schema({
    //_id   : Number, 
    _title: {
        type: String,
        required: true
    },
    _description: {
        type: String, default : ''
    },
    _createdAt: {
        type: Date,
        default: Date.now
    },
    _tag: {
        type: String,
        maxlength: 15,
        default: 'default'
    },
    _level: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'HIGHEST'],
        default: 'MEDIUM'
    },
    _status: {
        type: String,
        enum: ['TODO', 'DOING', 'REVIEWING', 'DONE', 'ARCHIVED'],
        default: 'TODO'
    }
});
module.exports = {
    Issue: mongoose.model('Issue', issueSchema)
}

/*
var issueSchema = new mongoose.Schema({
    //_id   : Number, 
    _title: String,
    _description: String,
    _createdAt: Date,
    _tag: {
        type: Number,
        ref: 'Tag'
    },
    _status: {
        type: Number,
        ref: 'Status'
    },
});
var tagSchema = new mongoose.Schema({
    //_id     : Number,
    _title: String,
    _color: String
});
var statusSchema = new mongoose.Schema({
    //_id     : Number,
    _description: String,
});

module.exports = {
    Status: mongoose.model('Status', statusSchema),
    Tag: mongoose.model('Tag', tagSchema),
    Issue: mongoose.model('Issue', issueSchema)
}*/