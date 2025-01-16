import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/logo.png";

const ViewDisablePopUp = ({ data }) => {
//   console.log(data);
  const dateRefs = Array(8)
  .fill(0)
  .map(() => useRef(null));
  const cnicRefs = Array(13).fill(0).map(() => useRef(null));
  const API_BASE_URL = "https://fundapi.pakardi.com";

  useEffect(() => {
    // Set CNIC digits into individual inputs
    if (data?.cnicNo) {
      const cnicDigits = data.cnicNo.replace(/-/g, '').split('');
      cnicDigits.forEach((digit, index) => {
        if (cnicRefs[index]?.current) {
          cnicRefs[index].current.value = digit;
        }
      });
    }

    // Set submission date digits into individual inputs
    if (data?.submittionDate) {
      const dateDigits = data.submittionDate.replace(/-/g, '').split('');
      dateDigits.forEach((digit, index) => {
        if (dateRefs[index]?.current) {
          dateRefs[index].current.value = digit;
        }
      });
    }

    // Set date of birth digits into individual inputs
    if (data?.dateOfBirth) {
      const dobParts = data.dateOfBirth.split('-');
      const dobDigits = `${dobParts[2]}${dobParts[1]}${dobParts[0]}`.split('');
      dobDigits.forEach((digit, index) => {
        if (dobRefs[index]?.current) {
          dobRefs[index].current.value = digit;
        }
      });
    }

  }, [data]);

  // Initialize form data with passed data
  const [formData, setFormData] = useState({
    submittionDate: data?.submittionDate || '',
    registrationNo: data?.registrationNo || '',
    childName: data?.childName || '',
    fatherName: data?.fatherName || '',
    status: data?.status || '',
    spouse: data?.spouse || '',
    cnicNo: data?.cnicNo || '',
    dateOfBirth: data?.dateOfBirth || '',
    qulafication: data?.qulafication || '',
    typeOfDisability: data?.typeOfDisability || '',
    nameOfDisability: data?.nameOfDisability || '',
    causeOfDisability: data?.causeOfDisability || '',
    TypeOfJob: data?.TypeOfJob || '',
    sourceOfIncome: data?.sourceOfIncome || '',
    appliedFor: data?.appliedFor || '',
    phoneNo: data?.phoneNo || '',
    presentAddress: data?.presentAddress || '',
    permanentAddress: data?.permanentAddress || '',
    applicantIsDeclearYesNo: data?.applicantIsDeclearYesNo || '',
    disabilityImpairment: data?.disabilityImpairment || '',
    fitToWork: data?.fitToWork || '',
    typeOfAdvise: data?.typeOfAdvise || '',
    referTo: data?.referTo || '',
    recomendationOfBoard: data?.recomendationOfBoard || '',
    recomendationOfBoard_1: data?.recomendationOfBoard_1 || '',
    recomendationOfBoard_2: data?.recomendationOfBoard_2 || '',
  });

  const dobRefs = Array(8).fill(0).map(() => useRef(null));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateInput = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = "";
      return;
    }
    if (value.length === 1 && index < 7) {
      dateRefs[index + 1].current.focus();
    }

    // Update submittionDate in formData
    const allDateInputs = dateRefs.map((ref) => ref.current.value);
    allDateInputs[index] = value;
    const dateString = `${allDateInputs[0]}${allDateInputs[1]}-${allDateInputs[2]}${allDateInputs[3]}-${allDateInputs[4]}${allDateInputs[5]}${allDateInputs[6]}${allDateInputs[7]}`;
    setFormData((prev) => ({ ...prev, submittionDate: dateString }));
  };

  const handleCnicInput = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = "";
      return;
    }
    if (value.length === 1 && index < 12) {
      cnicRefs[index + 1].current.focus();
    }

    // Update CNIC in formData
    const allCnicInputs = cnicRefs.map((ref) => ref.current.value);
    allCnicInputs[index] = value;
    // Format CNIC with hyphens: XXXXX-XXXXXXX-X
    const cnicString = `${allCnicInputs.slice(0, 5).join("")}-${allCnicInputs
      .slice(5, 12)
      .join("")}-${allCnicInputs[12] || ""}`;
    setFormData((prev) => ({ ...prev, cnicNo: cnicString }));
  };

  const handleKeyDown = (e, refs, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      refs[index - 1].current.focus();
    }
  };

  const handleDobInput = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = "";
      return;
    }
    if (value.length === 1 && index < 7) {
      dobRefs[index + 1].current.focus();
    }

    // Update DOB in formData
    const allDobInputs = dobRefs.map(ref => ref.current.value);
    // Format as YYYY-MM-DD directly for API compatibility
    const year = allDobInputs.slice(4,8).join('');
    const month = allDobInputs.slice(2,4).join('');
    const day = allDobInputs.slice(0,2).join('');
    
    if (day && month && year) {
      const dateString = `${year}-${month}-${day}`;
      setFormData(prev => ({ ...prev, dateOfBirth: dateString }));
    }
  };

  const handleDobKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      dobRefs[index - 1].current.focus();
    }
  };

  // Make all inputs readonly since this is a view-only popup
  const makeReadOnly = {
    readOnly: true,
    className: "w-full h-8 border border-gray-400 px-2 bg-gray-50"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="rounded-lg bg-gray-100">
        <div className="max-w-6xl mx-auto p-2 md:p-6 bg-white relative border border-gray-300">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <img
              src={logo}
              alt="Watermark"
              className="w-[700px] h-[700px] object-contain"
            />
          </div>

          {/* Header Banner */}
          <div className="rounded-lg p-1 bg-white">
            <div className="relative">
              {/* Green banner with curved edges */}
              <div className="bg-[#004F25] text-white relative">
                {/* Light green accent on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#90CE5F] rounded-r-lg"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-[#90CE5F] rounded-l-lg"></div>

                <div className="flex items-center justify-between px-8 py-0">
                  {/* Left logo */}
                  <div className="w-32 h-24 bg-white p-2 rounded-lg">
                    <img
                      src={logo}
                      alt="Help System Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Center text */}
                  <div className="text-center space-y-1">
                    <h1 className="text-4xl font-extrabold">HELP SYSTEM</h1>
                    <h2 className="text-2xl font-bold">KHYBER PUKHTUNKHWA</h2>
                    <p className="text-xl font-semibold">
                      Voluntary Social Welfare Organization
                    </p>
                    <p className="text-xl font-semibold">
                      Health Education Livelihood & Peace for All
                    </p>
                  </div>

                  {/* Right QR code */}
                  <div className="w-32 h-24 bg-white p-2 rounded-lg">
                    <img
                      src={logo}
                      alt="QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Membership Form Button */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  {/* Green pill background */}
                  <div className="absolute inset-0 bg-[#90CE5F] rounded-full -z-10 transform scale-x-125"></div>
                  <div className="bg-[#004F25] text-white px-12 py-2 rounded-lg font-bold text-xl">
                    Membership Form
                  </div>
                </div>
              </div>
            </div>

            {/* Membership ID */}
            <div className="text-right mt-16 mr-4 font-semibold">
              MEMBERSHIP ID: _____________
            </div>
          </div>

          <h2 className="text-xl font-bold text-center mb-6 mt-10">
            APPLICATION FORM FOR DISABILITY CERTIFICATE
          </h2>

          <form className="space-y-4 relative z-10">
            {/* Date and Registration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[10px]">
                  Date
                </label>
                <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto">
                  {[...Array(8)].map((_, i) => (
                    <React.Fragment key={`date-${i}`}>
                      <input
                        type="text"
                        className="w-8 h-8 border border-gray-400 text-center bg-transparent"
                        maxLength="1"
                        ref={dateRefs[i]}
                        disabled
                        onChange={(e) => handleDateInput(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, dateRefs, i)}
                      />
                      {(i === 1 || i === 3) && <span>-</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap">
                  Registration No DO/SW/CHD
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  disabled
                  value={formData.registrationNo}
                  name="registrationNo"
                />
              </div>
            </div>

            {/* Name and Father Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.childName}
                  disabled
                  name="childName"
                />
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Father Name
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.fatherName}
                  name="fatherName"
                  disabled
                />
              </div>
            </div>

            {/* Marital Status and Spouse */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Marital Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value="married"
                      checked={formData.status === "married"}
                      disabled
                      className="form-radio text-blue-600"
                    />
                    <span className="text-sm">Married</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value="unmarried"
                      checked={formData.status === "unmarried"}
                      disabled
                      className="form-radio text-blue-600"
                    />
                    <span className="text-sm">Unmarried</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Spouse
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                    value={formData.spouse}
                    disabled
                    name="spouse"
                  />
                  <span className="text-xs text-gray-500">
                    (Please write wife name or husband name)
                  </span>
                </div>
              </div>
            </div>

            {/* CNIC and Date of Birth */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
              <label className="block text-sm whitespace-nowrap min-w-[20px]">
                CNIC
              </label>
              <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {[...Array(13)].map((_, i) => (
                  <React.Fragment key={`cnic-${i}`}>
                    <input
                      type="number"
                      className="w-8 h-8 border border-gray-400 text-center bg-transparent"
                      maxLength="1"
                      ref={cnicRefs[i]}
                      disabled
                      onKeyDown={(e) => handleKeyDown(e, cnicRefs, i)}
                    />
                    {(i === 4 || i === 11) && <span>-</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
              <label className="block text-sm whitespace-nowrap min-w-[100px]">
                Date of Birth
              </label>
              <div className="flex gap-1 items-center">
                {/* Day */}
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={`dob-day-${i}`}>
                    <input
                      type="text"
                      className="w-8 h-8 border border-gray-400 text-center bg-transparent flex-shrink-0"
                      maxLength="1"
                      ref={dobRefs[i]}
                      disabled
                      onKeyDown={(e) => handleDobKeyDown(e, i)}
                      required
                    />
                  </React.Fragment>
                ))}
                <span className="flex-shrink-0">-</span>
                {/* Month */}
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={`dob-month-${i}`}>
                    <input
                      type="text"
                      className="w-8 h-8 border border-gray-400 text-center bg-transparent flex-shrink-0"
                      maxLength="1"
                      ref={dobRefs[i + 2]}
                      disabled
                      onKeyDown={(e) => handleDobKeyDown(e, i + 2)}
                      required
                    />
                  </React.Fragment>
                ))}
                <span className="flex-shrink-0">-</span>
                {/* Year */}
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={`dob-year-${i}`}>
                    <input
                      type="text"
                      className="w-8 h-8 border border-gray-400 text-center bg-transparent flex-shrink-0"
                      maxLength="1"
                      ref={dobRefs[i + 4]}
                      disabled
                      onKeyDown={(e) => handleDobKeyDown(e, i + 4)}
                      required
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
            {/* Qualification and Type of Disability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Qualification
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.qulafication}
                  disabled
                  name="qulafication"
                />
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Type of Disability
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                    value={formData.typeOfDisability}
                    disabled
                    name="typeOfDisability"
                  />
                  <span className="text-xs text-gray-500">
                    Physically / Visually / Deaf-mute / Mentally
                  </span>
                </div>
              </div>
            </div>

            {/* Name and Cause of Disability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Name of Disability
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.nameOfDisability}
                  disabled
                  name="nameOfDisability"
                />
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Cause of Disability
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.causeOfDisability}
                  disabled
                  name="causeOfDisability"
                />
              </div>
            </div>

            {/* Job and Income */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Type of Job can do
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.TypeOfJob}
                  disabled
                  name="TypeOfJob"
                />
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Source of Income
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.sourceOfIncome}
                  disabled
                  name="sourceOfIncome"
                />
              </div>
            </div>

            {/* Applied for and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Applied for
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.appliedFor}
                  disabled
                  name="appliedFor"
                />
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.phoneNo}
                  disabled
                  name="phoneNo"
                />
              </div>
            </div>

            {/* Address fields */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Present Address
                </label>
                <input
                  type="text"
                  className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                  value={formData.presentAddress}
                  disabled
                  name="presentAddress"
                />
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <label className="block text-sm whitespace-nowrap min-w-[150px]">
                  Permanent Address
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                    value={formData.permanentAddress}
                    disabled
                    name="permanentAddress"
                  />
                  <span className="text-xs text-gray-500 block mt-1">
                    (If address is not in CNIC please submit an affidavit on
                    stamp paper that Disabled Certificate is not gain in any
                    other district/province)
                  </span>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="p-4">
              <label className="block mb-2">Applicant Signature</label>
              <div className="w-full md:w-1/2 border-2 border-dashed border-gray-400 h-24">
                {data?.signatureApplicant ? (
                  <img 
                    src={`${API_BASE_URL}/${data.signatureApplicant}`}
                    alt="Applicant Signature"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No signature available
                  </div>
                )}
              </div>
            </div>

            {/* Replace the Assessment Board section in your JSX with this: */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-bold">
                RECOMMENDATION OF THE ASSESSMENT BOARD
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                  <label className="block text-sm whitespace-nowrap min-w-[150px]">
                    Is Applicant Declared
                  </label>
                  <select
                    className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                    value={formData.applicantIsDeclearYesNo}
                    disabled
                    name="applicantIsDeclearYesNo"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                  <label className="block text-sm whitespace-nowrap min-w-[150px]">
                    Disability / Impairment
                  </label>
                  <input
                    type="text"
                    className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                    value={formData.disabilityImpairment}
                    disabled
                    name="disabilityImpairment"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <label className="block text-sm whitespace-nowrap min-w-[150px]">
                      Fit to work
                    </label>
                    <input
                      type="text"
                      className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                      value={formData.fitToWork}
                      disabled
                      name="fitToWork"
                      required
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <label className="block text-sm whitespace-nowrap min-w-[150px]">
                      Type of Advise
                    </label>
                    <input
                      type="text"
                      className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                      value={formData.typeOfAdvise}
                      disabled
                      name="typeOfAdvise"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                  <label className="block text-sm whitespace-nowrap min-w-[150px]">
                    Refer To
                  </label>
                  <input
                    type="text"
                    className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                    value={formData.referTo}
                    disabled
                    name="referTo"
                    required
                  />
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                  <label className="block text-sm whitespace-nowrap min-w-[150px]">
                    Recommendation
                  </label>
                  <input
                    type="text"
                    className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                    value={formData.recomendationOfBoard}
                    disabled
                    name="recomendationOfBoard"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <label className="block text-sm whitespace-nowrap min-w-[50px]">
                      1.
                    </label>
                    <input
                      type="text"
                      className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                      value={formData.recomendationOfBoard_1}
                      disabled
                      name="recomendationOfBoard_1"
                      required
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <label className="block text-sm whitespace-nowrap min-w-[50px]">
                      2.
                    </label>
                    <input
                      type="text"
                      className="w-full h-8 border border-gray-400 px-2 bg-transparent"
                      value={formData.recomendationOfBoard_2}
                      disabled
                      name="recomendationOfBoard_2"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CNIC Images Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {/* Front CNIC */}
              {data?.cnicFrontPic && (
                <div className="w-full">
                  <label className="block mb-2">CNIC Front Image</label>
                  <div className="border-2 border-dashed border-gray-400 h-48">
                    <img 
                      src={`your_api_base_url/${data.cnicFrontPic}`}
                      alt="CNIC Front"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
              
              {data?.cnicBackPic && (
                <div className="w-full">
                  <label className="block mb-2">CNIC Back Image</label>
                  <div className="border-2 border-dashed border-gray-400 h-48">
                    <img 
                      src={`your_api_base_url/${data.cnicBackPic}`}
                      alt="CNIC Back"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewDisablePopUp;
