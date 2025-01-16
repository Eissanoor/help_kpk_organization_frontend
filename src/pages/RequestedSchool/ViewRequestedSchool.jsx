import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/logo.png";

const ViewRequestedSchool = ({ data }) => {
  // Create refs for CNIC inputs
  const fatherCnicRefs = Array(13).fill(0).map(() => useRef(null));
  const motherCnicRefs = Array(13).fill(0).map(() => useRef(null));
  const guardianCnicRefs = Array(13).fill(0).map(() => useRef(null));
  const dobRefs = Array(8).fill(0).map(() => useRef(null));
  const admissionDateRefs = Array(8).fill(0).map(() => useRef(null));
  const API_BASE_URL = "https://fundapi.pakardi.com";

  useEffect(() => {
    // Set father CNIC digits
    if (data?.fatherCnic) {
      const fatherCnicDigits = data.fatherCnic.replace(/-/g, '').split('');
      fatherCnicDigits.forEach((digit, index) => {
        if (fatherCnicRefs[index]?.current) {
          fatherCnicRefs[index].current.value = digit;
        }
      });
    }

    // Set mother CNIC digits
    if (data?.motherCnic) {
      const motherCnicDigits = data.motherCnic.replace(/-/g, '').split('');
      motherCnicDigits.forEach((digit, index) => {
        if (motherCnicRefs[index]?.current) {
          motherCnicRefs[index].current.value = digit;
        }
      });
    }

    // Set guardian CNIC digits
    if (data?.guardianCnic) {
      const guardianCnicDigits = data.guardianCnic.replace(/-/g, '').split('');
      guardianCnicDigits.forEach((digit, index) => {
        if (guardianCnicRefs[index]?.current) {
          guardianCnicRefs[index].current.value = digit;
        }
      });
    }

    // Set date of birth digits
    if (data?.dataOfBirth) {
      const dobParts = data.dataOfBirth.split('-');
      const dobDigits = `${dobParts[2]}${dobParts[1]}${dobParts[0]}`.split('');
      dobDigits.forEach((digit, index) => {
        if (dobRefs[index]?.current) {
          dobRefs[index].current.value = digit;
        }
      });
    }

    // Set admission date digits
    if (data?.DateOfAdmission) {
      const admissionParts = data.DateOfAdmission.split('-');
      const admissionDigits = `${admissionParts[2]}${admissionParts[1]}${admissionParts[0]}`.split('');
      admissionDigits.forEach((digit, index) => {
        if (admissionDateRefs[index]?.current) {
          admissionDateRefs[index].current.value = digit;
        }
      });
    }
  }, [data]);

  const [formData, setFormData] = useState({
    childName: data?.childName || "",
    fatherName: data?.fatherName || "",
    fatherCnic: data?.fatherCnic || "",
    motherName: data?.motherName || "",
    motherCnic: data?.motherCnic || "",
    dataOfBirth: data?.dataOfBirth || "",
    totalAge: data?.totalAge || "",
    bloodGroup: data?.bloodGroup || "",
    position: data?.position || "poor",
    childDisable: data?.childDisable || "",
    childDisableDesc: data?.childDisableDesc || "",
    previewsSchool: data?.previewsSchool || "",
    previewsSchoolDesc: data?.previewsSchoolDesc || "",
    schoolAdmittedIn: data?.schoolAdmittedIn || "",
    schoolclass: data?.schoolclass || "",
    DateOfAdmission: data?.DateOfAdmission || "",
    guardianName: data?.guardianName || "",
    guardianCnic: data?.guardianCnic || "",
    relationWithChild: data?.relationWithChild || "",
    relationContact: data?.relationContact || "",
    guardianAddress: data?.guardianAddress || "",
  });

  // Make all inputs readonly since this is a view-only popup
  const makeReadOnly = {
    readOnly: true,
    disabled: true,
    className: "w-full h-8 border border-gray-400 px-2 bg-gray-50"
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-2 md:p-3 rounded-lg bg-gray-100">
        <div className="max-w-6xl mx-auto p-3 md:p-6 relative bg-white">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <img
              src={logo}
              alt="Watermark"
              className="w-[500px] md:w-[700px] h-[500px] md:h-[700px] object-contain"
            />
          </div>

          {/* Header Banner */}
          <div className="bg-green-800 text-white px-2 py-1 mb-4">
            <h4 className="text-sm md:text-base">3. Orphans/Child Labor School Admission Form</h4>
          </div>

          <div className="space-y-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="min-w-[100px]">Child Name</label>
                <input
                  type="text"
                  value={formData.childName}
                  {...makeReadOnly}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="min-w-[100px]">Father Name</label>
                <input
                  type="text"
                  value={formData.fatherName}
                  {...makeReadOnly}
                />
              </div>

              {/* Father CNIC */}
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="min-w-[100px]">Father CNIC</label>
                <div className="flex gap-1 overflow-x-auto pb-2 md:pb-0">
                  {[...Array(13)].map((_, i) => (
                    <React.Fragment key={`father-cnic-${i}`}>
                      <input
                        type="text"
                        className="w-8 h-8 border border-gray-400 text-center bg-gray-50"
                        maxLength="1"
                        ref={fatherCnicRefs[i]}
                        disabled
                      />
                      {(i === 4 || i === 11) && <span className="flex-shrink-0">-</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[100px]">Mother Name</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[100px]">Mother CNIC</label>
                  <div className="flex gap-1 overflow-x-auto pb-2 md:pb-0">
                    {[...Array(13)].map((_, i) => (
                      <React.Fragment key={`mother-cnic-${i}`}>
                        <input
                          type="number"
                          className="w-8 h-8 border border-gray-400 text-center flex-shrink-0"
                          maxLength="1"
                          ref={motherCnicRefs[i]}
                          disabled
                        />
                        {(i === 4 || i === 11) && <span className="flex-shrink-0">-</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[100px]">Date of Birth</label>
                  <div className="flex gap-1 items-center">
                    {/* Day */}
                    {[...Array(2)].map((_, i) => (
                      <React.Fragment key={`dob-day-${i}`}>
                        <input
                          type="number"
                          className="w-8 h-8 border border-gray-400 text-center bg-transparent flex-shrink-0"
                          maxLength="1"
                          ref={dobRefs[i]}
                          disabled
                        />
                      </React.Fragment>
                    ))}
                    <span className="flex-shrink-0">-</span>
                    {/* Month */}
                    {[...Array(2)].map((_, i) => (
                      <React.Fragment key={`dob-month-${i}`}>
                        <input
                          type="number"
                          className="w-8 h-8 border border-gray-400 text-center bg-transparent flex-shrink-0"
                          maxLength="1"
                          ref={dobRefs[i + 2]}
                          disabled
                        />
                      </React.Fragment>
                    ))}
                    <span className="flex-shrink-0">-</span>
                    {/* Year */}
                    {[...Array(4)].map((_, i) => (
                      <React.Fragment key={`dob-year-${i}`}>
                        <input
                          type="number"
                          className="w-8 h-8 border border-gray-400 text-center bg-transparent flex-shrink-0"
                          maxLength="1"
                          ref={dobRefs[i + 4]}
                          disabled
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[100px]">Total Age</label>
                  <input
                    type="text"
                    name="totalAge"
                    value={formData.totalAge}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                  />
                </div>
              </div>

              {/* School Information Fields */}
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[150px]">School Admitted In</label>
                  <input
                    type="text"
                    name="schoolAdmittedIn"
                    value={formData.schoolAdmittedIn}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[150px]">School Class</label>
                  <input
                    type="text"
                    name="schoolclass"
                    value={formData.schoolclass}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[150px]">Date of Admission</label>
                  <div className="flex gap-1 items-center">
                    {/* Day */}
                    {[...Array(2)].map((_, i) => (
                      <React.Fragment key={`admission-day-${i}`}>
                        <input
                          type="text"
                          className="w-8 h-8 border border-gray-400 text-center bg-transparent flex-shrink-0"
                          maxLength="1"
                          ref={admissionDateRefs[i]}
                          disabled
                        />
                      </React.Fragment>
                    ))}
                    <span className="flex-shrink-0">-</span>
                    {/* Month */}
                    {[...Array(2)].map((_, i) => (
                      <React.Fragment key={`admission-month-${i}`}>
                        <input
                          type="text"
                          className="w-8 h-8 border border-gray-400 text-center bg-transparent flex-shrink-0"
                          maxLength="1"
                          ref={admissionDateRefs[i + 2]}
                          disabled
                        />
                      </React.Fragment>
                    ))}
                    <span className="flex-shrink-0">-</span>
                    {/* Year */}
                    {[...Array(4)].map((_, i) => (
                      <React.Fragment key={`admission-year-${i}`}>
                        <input
                          type="text"
                          className="w-8 h-8 border border-gray-400 text-center bg-transparent flex-shrink-0"
                          maxLength="1"
                          ref={admissionDateRefs[i + 4]}
                          disabled
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label>Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label>Position</label>
                  <select
                    name="position"
                    value={formData.position}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                  >
                    <option value="orphan">Orphan</option>
                    <option value="poor">Poor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Child Disability */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <label>Child Disability</label>
                  <select
                    name="childDisable"
                    value={formData.childDisable}
                    disabled
                    className="border border-gray-400 p-1"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {formData.childDisable === 'yes' && (
                  <input
                    type="text"
                    name="childDisableDesc"
                    value={formData.childDisableDesc}
                    disabled
                    placeholder="Please provide details"
                    className="w-full border border-gray-400 p-1"
                  />
                )}
              </div>

              {/* Previous School */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <label>Previous School</label>
                  <select
                    name="previewsSchool"
                    value={formData.previewsSchool}
                    disabled
                    className="border border-gray-400 p-1"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {formData.previewsSchool === 'yes' && (
                  <input
                    type="text"
                    name="previewsSchoolDesc"
                    value={formData.previewsSchoolDesc}
                    disabled
                    placeholder="Please provide school details"
                    className="w-full border border-gray-400 p-1"
                  />
                )}
              </div>

              {/* Guardian Information Fields */}
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[150px]">Guardian Name</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[150px]">Guardian CNIC</label>
                  <div className="flex gap-1 overflow-x-auto pb-2 md:pb-0">
                    {[...Array(13)].map((_, i) => (
                      <React.Fragment key={`guardian-cnic-${i}`}>
                        <input
                          type="text"
                          className="w-8 h-8 border border-gray-400 text-center flex-shrink-0"
                          maxLength="1"
                          ref={guardianCnicRefs[i]}
                          disabled
                        />
                        {(i === 4 || i === 11) && <span className="flex-shrink-0">-</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[150px]">Relation with Child</label>
                  <input
                    type="text"
                    name="relationWithChild"
                    value={formData.relationWithChild}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                    required
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[150px]">Contact Number</label>
                  <input
                    type="text"
                    name="relationContact"
                    value={formData.relationContact}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <label className="min-w-[150px]">Guardian Address</label>
                  <input
                    type="text"
                    name="guardianAddress"
                    value={formData.guardianAddress}
                    disabled
                    className="border border-gray-400 w-full md:flex-1 p-1"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label>Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  disabled
                  className="border border-gray-400 w-full md:flex-1 p-1"
                >
                  <option value="">Select Religion</option>
                  <option value="muslim">Muslim</option>
                  <option value="non-muslim">Non-Muslim</option>
                </select>
              </div>
             </div>

              {/* Images Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {/* Child Image */}
                {data?.image && (
                  <div className="w-full">
                    <label className="block mb-2">Child Image</label>
                    <div className="border-2 border-dashed border-gray-400 h-48">
                      <img 
                        src={`${API_BASE_URL}/${data.image}`}
                        alt="Child"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* CNIC Front */}
                {data?.cnicFrontPic && (
                  <div className="w-full">
                    <label className="block mb-2">CNIC Front Image</label>
                    <div className="border-2 border-dashed border-gray-400 h-48">
                      <img 
                        src={`${API_BASE_URL}/${data.cnicFrontPic}`}
                        alt="CNIC Front"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* CNIC Back */}
                {data?.cnicBackPic && (
                  <div className="w-full">
                    <label className="block mb-2">CNIC Back Image</label>
                    <div className="border-2 border-dashed border-gray-400 h-48">
                      <img 
                        src={`${API_BASE_URL}/${data.cnicBackPic}`}
                        alt="CNIC Back"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Guardian Signature */}
                {data?.guardianSignature && (
                  <div className="w-full">
                    <label className="block mb-2">Guardian Signature</label>
                    <div className="border-2 border-dashed border-gray-400 h-48">
                      <img 
                        src={`${API_BASE_URL}/${data.guardianSignature}`}
                        alt="Guardian Signature"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
      </div>
    </div>
  );
};

export default ViewRequestedSchool;