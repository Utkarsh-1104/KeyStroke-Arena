import mongoose from "mongoose";

const TestResultSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  wpm: { 
    type: Number, 
    required: true 
  },
  accuracy: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
});

const TestResult = mongoose.models.TestResult || mongoose.model("TestResult", TestResultSchema);
export default TestResult;