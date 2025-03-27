const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    backAcNum: { type: String, required: true },
    role: { type: String, required: true },

    tenth: {
        marks: { type: Number },
        passOut: { type: Number },
    },
    twelfth: {
        marks: { type: Number },
        passOut: { type: Number },
    },
    gapYears: { type: Number },
});

const institutionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bankAcNum: { type: String, required: true },
    role: { type: String, required: true },

    minAmt: { type: Number },
    maxAmt: { type: Number },
    interest: { type: Number },
    tenure: { type: Number }
});


export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export const Institution = mongoose.models.Institution || mongoose.model("Institution", institutionSchema);