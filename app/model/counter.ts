'use strict';
import mongoose from '../config/config-mongo';
const Schema: any = mongoose.Schema;

const CounterSchema = new Schema({
  key: { type: String },
  value: { type: Number }
});

export const counter = mongoose.model('Counter', CounterSchema);

export const getNextValue = (sequenceName) => {
  var sequenceDocument = db.counters.findAndModify({
    query:{_id: sequenceName },
    update: {$inc:{value:1}},
    new:true
  });
  return sequenceDocument.value;
}