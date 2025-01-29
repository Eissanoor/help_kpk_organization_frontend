import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import { API_BASE_URL } from "../../config/Config";
import jsPDF from "jspdf";

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
    guardianName: data?.guardianName || "",
    disability: data?.disability || "",
    disabilityDescription: data?.disabilityDescription || "",
  });

  // Make all inputs readonly since this is a view-only popup
  const makeReadOnly = {
    readOnly: true,
    disabled: true,
    className: "w-full h-8 border border-gray-400 px-2 bg-gray-50"
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const printDocument = async () => {
    try {
      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const lineHeight = 25;
      let yPos = margin;

      // Add watermark
      const watermarkSize = 400;
      const watermarkX = (pageWidth - watermarkSize) / 2;
      const watermarkY = (pageHeight - watermarkSize) / 2;
      
      // Add watermark with reduced opacity
      pdf.saveGraphicsState();
      pdf.setGState(new pdf.GState({ opacity: 0.1 }));
      pdf.addImage(logo, 'PNG', watermarkX, watermarkY, watermarkSize, watermarkSize);
      pdf.restoreGraphicsState();

      // Add header background (green rectangle)
      pdf.setFillColor(0, 79, 37); // #004F25 in RGB
      pdf.rect(margin, yPos, pageWidth - (2 * margin), 100, 'F');

      // Add white rectangles for logos
      pdf.setFillColor(255, 255, 255);
      pdf.rect(margin + 10, yPos + 20, 60, 60, 'F');
      pdf.rect(pageWidth - margin - 70, yPos + 20, 60, 60, 'F');

      // Add logos
      const logoWidth = 60;
      const logoHeight = 60;
      
      // Left logo
      const leftLogo = new Image();
      leftLogo.src = logo;
      await new Promise((resolve) => {
        leftLogo.onload = resolve;
      });
      pdf.addImage(leftLogo, 'PNG', margin + 10, yPos + 20, logoWidth, logoHeight);

      // Right logo
      const rightLogo = new Image();
      rightLogo.src = logo2;
      await new Promise((resolve) => {
        rightLogo.onload = resolve;
      });
      pdf.addImage(rightLogo, 'PNG', pageWidth - margin - logoWidth - 10, yPos + 20, logoWidth, logoHeight);

      // Add white text for header
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      
      // Title
      pdf.setFontSize(20);
      pdf.text("HELP SYSTEM", pageWidth/2, yPos + 30, { align: "center" });
      
      // Subtitle
      pdf.setFontSize(16);
      pdf.text("KHYBER PUKHTUNKHWA", pageWidth/2, yPos + 50, { align: "center" });
      
      // Organization details
      pdf.setFontSize(12);
      pdf.text("Voluntary Social Welfare Organization", pageWidth/2, yPos + 70, { align: "center" });
      pdf.text("Health Education Livelihood & Peace for All", pageWidth/2, yPos + 85, { align: "center" });

      // Reset text color and move yPos past header
      pdf.setTextColor(0, 0, 0);
      yPos += 120;

      // Rest of the form content
      // Helper function to add field with underline
      const addField = (label, value, x, y, width) => {
        pdf.text(label, x, y);
        const labelWidth = pdf.getTextWidth(label);
        const fieldStart = x + labelWidth + 5;
        const fieldWidth = width - labelWidth - 10;
        
        // Convert value to string and handle empty/null values
        const stringValue = value ? String(value) : "";
        
        // Add value or underline if empty
        if (stringValue) {
          pdf.text(stringValue, fieldStart, y);
        }
        
        // Add underline
        pdf.line(fieldStart, y + 2, x + width, y + 2);
      };

      // Calculate column widths
      const colWidth = (pageWidth - (2 * margin) - 20) / 2;
      const col2X = margin + colWidth + 20;

      // Personal Information
      pdf.setFont("helvetica", "bold");
      pdf.text("Personal Information", margin, yPos);
      pdf.setFont("helvetica", "normal");
      yPos += lineHeight;

      // Two columns layout
      addField("Full Name:", formData.childName, margin, yPos, colWidth);
      addField("Father/Husband:", "", col2X, yPos, colWidth);
      yPos += lineHeight;

      addField("CNIC No:", formData.cnicNo, margin, yPos, colWidth);
      addField("Date of Birth:", formData.dateOfBirth, col2X, yPos, colWidth);
      yPos += lineHeight;

      addField("Gender:", formData.gender, margin, yPos, colWidth);
      addField("Marital Status:", formData.maritalStatus, col2X, yPos, colWidth);
      yPos += lineHeight;

      addField("Religion:", formData.religion, margin, yPos, colWidth);
      addField("Blood Group:", formData.bloodGroup, col2X, yPos, colWidth);
      yPos += lineHeight * 2;

      // Contact Information
      pdf.setFont("helvetica", "bold");
      pdf.text("Contact Information", margin, yPos);
      pdf.setFont("helvetica", "normal");
      yPos += lineHeight;

      addField("Contact Number:", formData.contactNumber, margin, yPos, colWidth);
      addField("Alternative Contact:", formData.contactNumber2, col2X, yPos, colWidth);
      yPos += lineHeight;

      // Addresses need full width
      pdf.text("Current Address:", margin, yPos);
      yPos += lineHeight;
      pdf.text(formData.currentAddress || "____________________", margin + 20, yPos);
      pdf.line(margin + 20, yPos + 2, pageWidth - margin, yPos + 2);
      yPos += lineHeight;

      pdf.text("Permanent Address:", margin, yPos);
      yPos += lineHeight;
      pdf.text(formData.permanentAddress || "____________________", margin + 20, yPos);
      pdf.line(margin + 20, yPos + 2, pageWidth - margin, yPos + 2);
      yPos += lineHeight * 2;

      // Family Information
      pdf.setFont("helvetica", "bold");
      pdf.text("Family Information", margin, yPos);
      pdf.setFont("helvetica", "normal");
      yPos += lineHeight;

      addField("Total Children:", String(formData.noOfChildren || ""), margin, yPos, colWidth);
      addField("Children in School:", String(formData.noOfChildrenInSchool || ""), col2X, yPos, colWidth);
      yPos += lineHeight;

      addField("Male Children:", String(formData.noOfChildrenMale || ""), margin, yPos, colWidth);
      addField("Female Children:", String(formData.noOfChildrenFemale || ""), col2X, yPos, colWidth);
      yPos += lineHeight * 2;

      // Add CNIC Images if available
      if (data?.cnicFrontPic || data?.cnicBackPic) {
        pdf.setFont("helvetica", "bold");
        pdf.text("CNIC Images", margin, yPos);
        pdf.setFont("helvetica", "normal");
        yPos += lineHeight;

        const imageWidth = (pageWidth - (2 * margin) - 20) / 2;
        const imageHeight = 150;

        if (data?.cnicFrontPic) {
          const frontImg = new Image();
          frontImg.src = `${API_BASE_URL}/${data.cnicFrontPic}`;
          await new Promise((resolve) => {
            frontImg.onload = resolve;
          });
          pdf.addImage(frontImg, 'JPEG', margin, yPos, imageWidth, imageHeight, 'front', 'MEDIUM');
        }

        if (data?.cnicBackPic) {
          const backImg = new Image();
          backImg.src = `${API_BASE_URL}/${data.cnicBackPic}`;
          await new Promise((resolve) => {
            backImg.onload = resolve;
          });
          pdf.addImage(backImg, 'JPEG', col2X, yPos, imageWidth, imageHeight, 'back', 'MEDIUM');
        }
      }

      // Add footer
      const footerY = pdf.internal.pageSize.getHeight() - margin;
      pdf.setFontSize(10);
      pdf.text("Generated on: " + new Date().toLocaleDateString(), margin, footerY);

      pdf.save("member_details.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const [zoomLevels, setZoomLevels] = useState({
    front: 1,
    back: 1
  });

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
                        src={logo2}
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
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="min-w-[80px]">Father/Husband</label>
                    <select
                      value={formData.relation}
                      {...makeReadOnly}
                    >
                      <option value="father">Father</option>
                      <option value="husband">Husband</option>
                    </select>
                    <input
                      type="text"
                      value={formData.guardianName}
                      className="flex-1 border border-gray-400 px-2 bg-gray-50"
                      {...makeReadOnly}
                    />
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

                      {/* Disability */}
                      <div className="flex items-center gap-2 ml-4">
                        <label className="text-sm">Disability</label>
                        <select
                          value={formData.disability}
                          {...makeReadOnly}
                          className="border border-gray-400 px-2 bg-gray-50"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formData.disability === 'yes' && (
                          <input
                            type="text"
                            value={formData.disabilityDescription}
                            className="flex-1 border border-gray-400 px-2 bg-gray-50"
                            {...makeReadOnly}
                          />
                        )}
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
                    <div className="w-full relative group">
                      <label className="block mb-2">CNIC Front Image</label>
                      <div className="border-2 border-dashed border-gray-400 h-48 overflow-hidden">
                        <img 
                          src={`${API_BASE_URL}/${data.cnicFrontPic}`}
                          alt="CNIC Front"
                          className="w-full h-full object-contain group-hover:opacity-50"
                        />
                        {/* Enlarged image with zoom controls */}
                        <div className="hidden group-hover:block fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                          <div className="relative">
                            <img 
                              src={`${API_BASE_URL}/${data.cnicFrontPic}`}
                              alt="CNIC Front Enlarged"
                              className="w-[800px] h-[500px] border-4 border-white shadow-xl transition-transform duration-200 object-contain bg-white"
                              style={{ transform: `scale(${zoomLevels.front})` }}
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setZoomLevels(prev => ({...prev, front: prev.front + 0.2}));
                                }}
                                className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100"
                              >
                                <span className="text-xl">+</span>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setZoomLevels(prev => ({...prev, front: Math.max(0.5, prev.front - 0.2)}));
                                }}
                                className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100"
                              >
                                <span className="text-xl">-</span>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setZoomLevels(prev => ({...prev, front: 1}));
                                }}
                                className="bg-white rounded-full px-2 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100 text-sm"
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {data?.cnicBackPic && (
                    <div className="w-full relative group">
                      <label className="block mb-2">CNIC Back Image</label>
                      <div className="border-2 border-dashed border-gray-400 h-48 overflow-hidden">
                        <img 
                          src={`${API_BASE_URL}/${data.cnicBackPic}`}
                          alt="CNIC Back"
                          className="w-full h-full object-contain group-hover:opacity-50"
                        />
                        {/* Enlarged image with zoom controls */}
                        <div className="hidden group-hover:block fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                          <div className="relative">
                            <img 
                              src={`${API_BASE_URL}/${data.cnicBackPic}`}
                              alt="CNIC Back Enlarged"
                              className="w-[800px] h-[500px] border-4 border-white shadow-xl transition-transform duration-200 object-contain bg-white"
                              style={{ transform: `scale(${zoomLevels.back})` }}
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setZoomLevels(prev => ({...prev, back: prev.back + 0.2}));
                                }}
                                className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100"
                              >
                                <span className="text-xl">+</span>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setZoomLevels(prev => ({...prev, back: Math.max(0.5, prev.back - 0.2)}));
                                }}
                                className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100"
                              >
                                <span className="text-xl">-</span>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setZoomLevels(prev => ({...prev, back: 1}));
                                }}
                                className="bg-white rounded-full px-2 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100 text-sm"
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                        </div>
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