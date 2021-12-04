const mongoose = require('mongoose');
const { Schema } = mongoose;

const committeMemberSchema = new Schema({
    name: { name: String, type: String },
    description: { name: String, type: String }
});

module.exports = mongoose.model('CommitteeMember', committeMemberSchema, 'CommitteeMembers');
module.exports = committeMemberSchema;
