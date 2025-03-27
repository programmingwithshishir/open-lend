import { useState } from "react";
import { z } from "zod";

const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
  bankAccount: z.string().min(5, "Invalid bank account"),
  twelthMarks: z.string().regex(/^\d{1,3}$/, "Enter valid percentage"),
  tenthMarks: z.string().regex(/^\d{1,3}$/, "Enter valid percentage"),
});

const lenderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
  bankAccount: z.string().min(5, "Invalid bank account"),
  panCard: z.string().min(10, "Invalid PAN Card"),
  minLoan: z.string().regex(/^\d+$/, "Enter valid amount"),
  maxLoan: z.string().regex(/^\d+$/, "Enter valid amount"),
});

const OnBoarding = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const schema = selectedOption === "student" ? studentSchema : lenderSchema;
    const result = schema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
    } else {
      const jsonData = JSON.stringify({ ...formData, role: selectedOption }, null, 2);
      console.log("Generated JSON:", jsonData);
      
      const endpoint = selectedOption === "student" ? "onboarding/students" : "onboarding/lender";
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        });
        if (response.ok) {
          console.log("Form submitted successfully");
        } else {
          console.error("Submission failed");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (isConfirmed && !showForm) return null;

  return (
    <div className="bg-primary min-h-screen w-screen flex flex-col justify-center items-center font-primary">
      <div className="px-8 py-7 my-10 rounded-xl flex flex-col gap-4 justify-center bg-secondary">
        {showForm && <h2 className="text-2xl font-semibold font-primary text-center">Enter {selectedOption === "student" ? "Student" : "Lender"} Details</h2>}
        {!isConfirmed && (
          <>
            <button
              className={`px-4 py-2 rounded-lg hover:bg-primary hover:cursor-pointer transition-colors font-secondary font-bold text-xl ${
                selectedOption === "student" ? "bg-primary text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedOption("student")}
            >
              I'm a Student
            </button>
            <button
              className={`px-4 py-2 rounded-lg hover:bg-primary hover:cursor-pointer transition-colors font-secondary font-bold text-xl ${
                selectedOption === "lender" ? "bg-primary text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedOption("lender")}
            >
              I'm a Lender
            </button>
            <button
              onClick={() => setShowForm(true) || setIsConfirmed(true)}
              className="mt-4 w-full rounded-lg hover:cursor-pointer px-4 py-2 bg-accent text-black font-primary"
              disabled={!selectedOption}
            >
              Submit
            </button>
          </>
        )}
        {showForm && (
          <form onSubmit={handleFinalSubmit} className="flex flex-col gap-2 mt-4 font-primary">
            {Object.keys(errors).map((key) => (
              <p key={key} className="text-red-500">{errors[key]?._errors?.[0]}</p>
            ))}
            <input required type="text" placeholder="Name" value={formData.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} className="border border-accent bg-primary p-2 rounded" />
            <input required type="email" placeholder="Email" value={formData.email || ""} onChange={(e) => handleInputChange("email", e.target.value)} className="border border-accent bg-primary p-2 rounded" />
            <input required type="text" placeholder="Phone" value={formData.phone || ""} onChange={(e) => handleInputChange("phone", e.target.value)} className="border border-accent bg-primary p-2 rounded" />
            <input required type="text" placeholder="Bank Account" value={formData.bankAccount || ""} onChange={(e) => handleInputChange("bankAccount", e.target.value)} className="border border-accent bg-primary p-2 rounded" />
            {selectedOption === "student" ? (
              <>
                <input required type="text" placeholder="12th Percentage" value={formData.twelthMarks || ""} onChange={(e) => handleInputChange("twelthMarks", e.target.value)} className="border border-accent bg-primary p-2 rounded" />
                <input required type="text" placeholder="10th Percentage" value={formData.tenthMarks || ""} onChange={(e) => handleInputChange("tenthMarks", e.target.value)} className="border border-accent bg-primary p-2 rounded" />
              </>
            ) : (
              <>
                <input required type="text" placeholder="PAN Card" value={formData.panCard || ""} onChange={(e) => handleInputChange("panCard", e.target.value)} className="border border-accent bg-primary p-2 rounded" />
                <input required type="text" placeholder="Minimum Loan Sanction" value={formData.minLoan || ""} onChange={(e) => handleInputChange("minLoan", e.target.value)} className="border border-accent bg-primary p-2 rounded" />
                <input required type="text" placeholder="Maximum Loan Sanction" value={formData.maxLoan || ""} onChange={(e) => handleInputChange("maxLoan", e.target.value)} className="border border-accent bg-primary p-2 rounded" />
              </>
            )}
            <button type="submit" className="text-2xl py-1 font-bold font-secondary bg-accent hover:cursor-pointer rounded-lg">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OnBoarding;