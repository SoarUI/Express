var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var AutoIncSchema = new mongoose.Schema({
    _tid:{type:String,required:true,index:{unique:true}},
    seq:{type:Number,default:1}
});
var AutoIncDB;
if (mongoose.connection.models['counter']) {
  AutoIncDB = mongoose.connection.models['counter'];
} else {
  AutoIncDB = mongoose.model('counter', AutoIncSchema );
  AutoIncDB.createIndexes();
}
var getNextSeq=async function(id){
    var sequenceDocument = await AutoIncDB.findOneAndUpdate(
        {"_tid": id },{$inc:{"seq":1}},{ new: true }
        );
     return sequenceDocument.seq;
}
var insertseq=async (data)=>{
    var newid= new AutoIncDB(data);
    return await newid.save();
}
var findone= async (query)=>{
  return await AutoIncDB.findOne(query);
}
module.exports={
    getNextSeq,
    insertseq,
    findone
}