import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { API_BASE_URL } from "../../config/Config";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ViewRequestedMember = ({ data }) => {
    console.log(data);
  // Create refs for CNIC inputs
  const cnicRefs = Array(13).fill(0).map(() => useRef(null));
  const fatherCnicRefs = Array(13).fill(0).map(() => useRef(null));
  const dobRefs = Array(8).fill(0).map(() => useRef(null));

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

    // Set father/relation CNIC digits
    if (data?.relationCnic) {
      const relationCnicDigits = data.relationCnic.replace(/-/g, '').split('');
      relationCnicDigits.forEach((digit, index) => {
        if (fatherCnicRefs[index]?.current) {
          fatherCnicRefs[index].current.value = digit;
        }
      });
    }

    // Set date of birth digits
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

  const [formData, setFormData] = useState({
    childName: data?.childName || "",
    cnicNo: data?.cnicNo || "",
    relation: data?.relation || "father",
    relationCnic: data?.relationCnic || "",
    dateOfBirth: data?.dateOfBirth || "",
    gender: data?.gender || "",
    maritalStatus: data?.maritalStatus || "",
    nationality: data?.nationality || "",
    tehsil: data?.tehsil || "",
    district: data?.district || "",
    religion: data?.religion || "",
    bloodGroup: data?.bloodGroup || "",
    qualification: data?.qualification || "",
    profession: data?.profession || "",
    currentAddress: data?.currentAddress || "",
    permanentAddress: data?.permanentAddress || "",
    contactNumber: data?.contactNumber || "",
    contactNumber2: data?.contactNumber2 || "",
    TypeOfAccommodation: data?.TypeOfAccommodation || "",
    noOfDependents: data?.noOfDependents || "",
    noOfChildren: data?.noOfChildren || "",
    noOfChildrenMale: data?.noOfChildrenMale || "",
    noOfChildrenFemale: data?.noOfChildrenFemale || "",
    noOfChildrenInSchool: data?.noOfChildrenInSchool || "",
    nameOfSchoolChildren: data?.nameOfSchoolChildren || [
      { name: "", class: "", age: "", SchoolName: "" }
    ],
    addictiveDrugs: data?.addictiveDrugs || "",
    addictiveDrugsDescription: data?.addictiveDrugsDescription || "",
    anyDisability: data?.anyDisability || "",
    anyDisabilityDescription: data?.anyDisabilityDescription || "",
    politicalAffiliation: data?.politicalAffiliation || "",
    politicalAffiliationDescription: data?.politicalAffiliationDescription || "",
    NGO: data?.NGO || "",
    NGODescription: data?.NGODescription || "",
  });

  // Make all inputs readonly since this is a view-only popup
  const makeReadOnly = {
    readOnly: true,
    disabled: true,
    className: "w-full h-8 border border-gray-400 px-2 bg-gray-50"
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const printDocument = () => {
    const input = document.getElementById("form-to-print");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
        putOnlyUsedFonts: true,
        floatPrecision: 16
      });
      
      // Add the form image to the PDF
      doc.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Add CNIC images if they exist
      if (data?.cnicFrontPic) {
        const cnicFrontImg = `${API_BASE_URL}/${data.cnicFrontPic}`;
        doc.addImage(cnicFrontImg, "PNG", 10, canvas.height + 10, 100, 100);
      }

      if (data?.cnicBackPic) {
        const cnicBackImg = `${API_BASE_URL}/${data.cnicBackPic}`;
        doc.addImage(cnicBackImg, "PNG", 10, canvas.height + 120, 100, 100);
      }

      doc.save("requested_member_details.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div id="form-to-print" className="p-4">
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
            <div className="rounded-lg p-1 bg-white mb-6 md:mb-10">
              <div className="relative">
                <div className="bg-[#004F25] text-white relative">
                  <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-[#90CE5F] rounded-r-lg"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-4 md:w-8 bg-[#90CE5F] rounded-l-lg"></div>

                  <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-2 md:py-0">
                    {/* Left logo */}
                    <div className="w-24 md:w-32 h-20 md:h-24 bg-white p-2 rounded-lg mb-2 md:mb-0">
                      <img
                        src={logo}
                        alt="Help System Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Center text */}
                    <div className="text-center space-y-0.5 md:space-y-1 py-2 md:py-0">
                      <h1 className="text-2xl md:text-4xl font-extrabold">HELP SYSTEM</h1>
                      <h2 className="text-xl md:text-2xl font-bold">KHYBER PUKHTUNKHWA</h2>
                      <p className="text-base md:text-xl font-semibold">
                        Voluntary Social Welfare Organization
                      </p>
                      <p className="text-base md:text-xl font-semibold">
                        Health Education Livelihood & Peace for All
                      </p>
                    </div>

                    {/* Right QR code */}
                    <div className="w-24 md:w-32 h-20 md:h-24 bg-white p-2 rounded-lg mt-2 md:mt-0">
                      <img
                        src={logo}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* 1. Personal Details */}
              <div className="space-y-4">
                <h4 className="font-bold">1. Personal Details</h4>

                {/* Name and CNIC */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="min-w-[80px]">Full Name</label>
                    <input
                      type="text"
                      value={formData.childName}
                      className="w-full h-8 border border-gray-400 px-2 bg-gray-50"
                      {...makeReadOnly}
                    />
                  </div>
                  {/* User CNIC Input */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="min-w-[50px]">CNIC</label>
                    <div className="flex gap-1 overflow-x-auto pb-2 md:pb-0">
                      {[...Array(13)].map((_, i) => (
                        <React.Fragment key={`user-cnic-${i}`}>
                          <input
                            type="text"
                            className="w-8 h-8 border border-gray-400 text-center bg-gray-50"
                            maxLength="1"
                            ref={cnicRefs[i]}
                            disabled
                          />
                          {(i === 4 || i === 11) && <span className="flex-shrink-0">-</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Father/Husband */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <label>Father/Husband</label>
                      <select
                        value={formData.relation}
                        {...makeReadOnly}
                      >
                        <option value="father">Father</option>
                        <option value="husband">Husband</option>
                      </select>
                    </div>
                  </div>

                  {/* Father/Husband CNIC Input */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="min-w-[50px]">CNIC</label>
                    <div className="flex gap-1 overflow-x-auto pb-2">
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
                </div>

                {/* Nationality, Religion, Tehsil, and District */}
                <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
                  {/* Nationality */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      disabled
                      className="border border-gray-400 p-1 w-full"
                    />
                  </div>

                  {/* Religion */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Religion</label>
                    <select
                      name="religion"
                      value={formData.religion}
                      disabled
                      className="border border-gray-400 p-1 w-full"
                    >
                      <option value="">Select Religion</option>
                      <option value="muslim">Muslim</option>
                      <option value="non-muslim">Non-Muslim</option>
                    </select>
                  </div>

                  {/* Tehsil */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Tehsil</label>
                    <input
                      type="text"
                      name="tehsil"
                      value={formData.tehsil}
                      disabled
                      className="border border-gray-400 p-1 w-full"
                    />
                  </div>

                  {/* District */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">District</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      disabled
                      className="border border-gray-400 p-1 w-full"
                    />
                  </div>
                </div>

                {/* Date of Birth and Gender */}
                <div className="p-2">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* <div className="flex items-center gap-2">
                      <label className="whitespace-nowrap text-sm">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="border border-gray-400 bg-transparent p-1"
                        required
                      />
                    </div> */}
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
                              ref={dobRefs[i]}
                              disabled
                            />
                            {(i === 1 || i === 3) && <span>-</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm">Gender</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            disabled
                          /> Male
                        </label>
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            disabled
                          /> Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Marital Status */}
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <label className="text-sm">Marital Status</label>
                  <div className="flex flex-wrap gap-4">
                    {["single", "married", "divorced", "widow"].map((status) => (
                      <label key={status} className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="maritalStatus"
                          value={status}
                          checked={formData.maritalStatus === status}
                          disabled
                        /> 
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Blood Group, Qualification, and Profession */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Blood Group */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="text-sm">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      disabled
                      className="border border-gray-400 bg-transparent p-1 w-full md:w-auto"
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Qualification */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="text-sm">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      disabled
                      className="border border-gray-400 bg-transparent p-1 w-full md:w-auto"
                    />
                  </div>

                  {/* Profession */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="text-sm">Profession</label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      disabled
                      className="border border-gray-400 bg-transparent p-1 w-full md:w-auto"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Current Address</label>
                    <input
                      type="text"
                      name="currentAddress"
                      value={formData.currentAddress}
                      disabled
                      className="border border-gray-400 bg-transparent p-1 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Permanent Address</label>
                    <input
                      type="text"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      disabled
                      className="border border-gray-400 bg-transparent p-1 w-full"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      disabled
                      className="border border-gray-400 bg-transparent p-1 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm">Alternative Contact</label>
                    <input
                      type="text"
                      name="contactNumber2"
                      value={formData.contactNumber2}
                      disabled
                      className="border border-gray-400 bg-transparent p-1 w-full"
                    />
                  </div>
                </div>

                {/* Accommodation and Dependents */}
                <div className="p-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <label className="text-sm whitespace-nowrap">Type of Accommodation</label>
                      <select
                        name="TypeOfAccommodation"
                        value={formData.TypeOfAccommodation}
                        disabled
                        className="border border-gray-400 bg-transparent p-1 w-full md:w-auto"
                      >
                        <option value="">Select Type</option>
                        <option value="owned">Owned</option>
                        <option value="rented">Rented</option>
                      </select>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <label className="text-sm whitespace-nowrap">Number of Dependents</label>
                      <input
                        type="number"
                        name="noOfDependents"
                        value={formData.noOfDependents}
                        disabled
                        className="border border-gray-400 bg-transparent p-1 w-full md:w-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* Total Children */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Total Children</label>
                  <input
                    type="number"
                    name="noOfChildren"
                    value={formData.noOfChildren}
                    disabled
                    className="border border-gray-400 bg-transparent p-1 w-full"
                  />
                </div>

                {/* Children Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="min-w-[80px]">Total Children</label>
                    <input
                      type="number"
                      name="noOfChildren"
                      value={formData.noOfChildren}
                      disabled
                      className="flex-1 border border-gray-400 bg-transparent p-1"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="min-w-[80px]">Children in School</label>
                    <input
                      type="number"
                      name="noOfChildrenInSchool"
                      value={formData.noOfChildrenInSchool}
                      disabled
                      className="flex-1 border border-gray-400 bg-transparent p-1"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="min-w-[80px]">Male Children</label>
                    <input
                      type="number"
                      name="noOfChildrenMale"
                      value={formData.noOfChildrenMale}
                      disabled
                      className="flex-1 border border-gray-400 bg-transparent p-1"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="min-w-[80px]">Female Children</label>
                    <input
                      type="number"
                      name="noOfChildrenFemale"
                      value={formData.noOfChildrenFemale}
                      disabled
                      className="flex-1 border border-gray-400 bg-transparent p-1"
                    />
                  </div>
                </div>

                {/* School Children Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Children's School Details</h4>
                  </div>
                  
                  {formData.nameOfSchoolChildren.map((child, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4">
                      <input
                        type="text"
                        placeholder="Name"
                        value={child.name}
                        disabled
                        className="border border-gray-400 bg-transparent p-1"
                      />
                      <input
                        type="text"
                        placeholder="Class"
                        value={child.class}
                        disabled
                        className="border border-gray-400 bg-transparent p-1"
                      />
                      <input
                        type="text"
                        placeholder="Age"
                        value={child.age}
                        disabled
                        className="border border-gray-400 bg-transparent p-1"
                      />
                      <input
                        type="text"
                        placeholder="School Name"
                        value={child.SchoolName}
                        disabled
                        className="border border-gray-400 bg-transparent p-1"
                      />
                    </div>
                  ))}
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Additional Information</h4>
                  
                  {/* Addictive Drugs */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <label>Addictive Drugs?</label>
                      <select
                        name="addictiveDrugs"
                        value={formData.addictiveDrugs}
                        disabled
                        className="border border-gray-400 bg-transparent p-1"
                        required
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    {formData.addictiveDrugs === 'yes' && (
                      <input
                        type="text"
                        name="addictiveDrugsDescription"
                        value={formData.addictiveDrugsDescription}
                        disabled
                        placeholder="Please provide details"
                        className="w-full border border-gray-400 bg-transparent p-1"
                      />
                    )}
                  </div>

                  {/* Disability */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <label>Any Disability?</label>
                      <select
                        name="anyDisability"
                        value={formData.anyDisability}
                        disabled
                        className="border border-gray-400 bg-transparent p-1"
                        required
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    {formData.anyDisability === 'yes' && (
                      <input
                        type="text"
                        name="anyDisabilityDescription"
                        value={formData.anyDisabilityDescription}
                        disabled
                        placeholder="Please provide details"
                        className="w-full border border-gray-400 bg-transparent p-1"
                      />
                    )}
                  </div>

                  {/* Political Affiliation */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <label>Political Affiliation?</label>
                      <select
                        name="politicalAffiliation"
                        value={formData.politicalAffiliation}
                        disabled
                        className="border border-gray-400 bg-transparent p-1"
                        required
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    {formData.politicalAffiliation === 'yes' && (
                      <input
                        type="text"
                        name="politicalAffiliationDescription"
                        value={formData.politicalAffiliationDescription}
                        disabled
                        placeholder="Please provide details"
                        className="w-full border border-gray-400 bg-transparent p-1"
                      />
                    )}
                  </div>

                  {/* NGO */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <label>NGO Affiliation?</label>
                      <select
                        name="NGO"
                        value={formData.NGO}
                        disabled
                        className="border border-gray-400 bg-transparent p-1"
                        required
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    {formData.NGO === 'yes' && (
                      <input
                        type="text"
                        name="NGODescription"
                        value={formData.NGODescription}
                        disabled
                        placeholder="Please provide details"
                        className="w-full border border-gray-400 bg-transparent p-1"
                      />
                    )}
                  </div>
                </div>
                
                {/* CNIC Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {data?.cnicFrontPic && (
                    <div className="w-full">
                      <label className="block mb-2">CNIC Front Image</label>
                      <div className="border-2 border-dashed border-gray-400 h-48 overflow-hidden">
                        <img 
                          src={`${API_BASE_URL}/${data.cnicFrontPic}`}
                          alt="CNIC Front"
                          className="w-full h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[2.5]"
                        />
                      </div>
                    </div>
                  )}
                  
                  {data?.cnicBackPic && (
                    <div className="w-full">
                      <label className="block mb-2">CNIC Back Image</label>
                      <div className="border-2 border-dashed border-gray-400 h-48 overflow-hidden">
                        <img 
                          src={`${API_BASE_URL}/${data.cnicBackPic}`}
                          alt="CNIC Back"
                          className="w-full h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[2.5]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button 
          onClick={printDocument} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Print PDF
        </button>
      </div>
    </div>
  );
};

export default ViewRequestedMember;