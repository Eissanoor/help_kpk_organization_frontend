import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { API_BASE_URL } from "../../config/Config";
import jsPDF from "jspdf";

const ViewDisablePopUp = ({ data }) => {
//   console.log(data);
  const dateRefs = Array(8)
  .fill(0)
  .map(() => useRef(null));
  const cnicRefs = Array(13).fill(0).map(() => useRef(null));
  

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
    serialNo: data?.serialNo || '',
    
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

  const printDocument = async () => {
    try {
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

      // Helper function to safely add text
      const safeText = (text, x, y, options = {}) => {
        try {
          if (text != null && text !== undefined) {
            pdf.text(String(text), x, y, options);
          }
        } catch (error) {
          console.error(`Error adding text: ${text}`, error);
        }
      };

      // Helper function to add field with underline
      const addField = (label, value, x, y, width) => {
        try {
          const safeLabel = String(label || '');
          const safeValue = String(value || '');
          
          safeText(safeLabel, x, y);
          
          const labelWidth = pdf.getTextWidth(safeLabel);
          const fieldStart = x + labelWidth + 5;
          
          if (safeValue.trim()) {
            safeText(safeValue, fieldStart, y);
          }
          
          pdf.line(fieldStart, y + 2, x + width, y + 2);
        } catch (error) {
          console.error(`Error adding field ${label}:`, error);
        }
      };

      // Add watermark
      const watermarkSize = 400;
      const watermarkX = (pageWidth - watermarkSize) / 2;
      const watermarkY = (pageHeight - watermarkSize) / 2;
      
      pdf.saveGraphicsState();
      pdf.setGState(new pdf.GState({ opacity: 0.1 }));
      pdf.addImage(logo, 'PNG', watermarkX, watermarkY, watermarkSize, watermarkSize);
      pdf.restoreGraphicsState();

      // Add header background
      pdf.setFillColor(0, 79, 37);
      pdf.rect(margin, margin, pageWidth - (2 * margin), 100, 'F');

      // Add logo
      const logoWidth = 60;
      const logoHeight = 60;
      
      try {
        const leftLogo = new Image();
        leftLogo.src = logo;
        await new Promise((resolve) => {
          leftLogo.onload = resolve;
        });
        pdf.addImage(leftLogo, 'PNG', margin + 10, margin + 20, logoWidth, logoHeight);
      } catch (error) {
        console.error("Error adding logo:", error);
      }

      // Add header text
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      
      safeText("HELP SYSTEM", pageWidth/2, margin + 30, { align: "center" });
      
      pdf.setFontSize(16);
      safeText("KHYBER PUKHTUNKHWA", pageWidth/2, margin + 50, { align: "center" });
      
      pdf.setFontSize(12);
      safeText("Voluntary Social Welfare Organization", pageWidth/2, margin + 70, { align: "center" });
      safeText("Health Education Livelihood & Peace for All", pageWidth/2, margin + 85, { align: "center" });

      // Reset text color and move position
      pdf.setTextColor(0, 0, 0);
      yPos += 120;

      // Add form fields
      const fields = [
        { label: "Serial No:", value: formData.serialNo },
        { label: "Name:", value: formData.childName },
        { label: "Father Name:", value: formData.fatherName },
        { label: "CNIC:", value: formData.cnicNo },
        { label: "Date of Birth:", value: formData.dateOfBirth },
        { label: "Qualification:", value: formData.qulafication },
        { label: "Type of Disability:", value: formData.typeOfDisability },
        { label: "Name of Disability:", value: formData.nameOfDisability },
        { label: "Cause of Disability:", value: formData.causeOfDisability },
        { label: "Type of Job:", value: formData.TypeOfJob },
        { label: "Source of Income:", value: formData.sourceOfIncome },
        { label: "Applied For:", value: formData.appliedFor },
        { label: "Phone Number:", value: formData.phoneNo },
        { label: "Present Address:", value: formData.presentAddress },
        { label: "Permanent Address:", value: formData.permanentAddress }
      ];

      fields.forEach(field => {
        addField(field.label, field.value, margin, yPos, pageWidth - (2 * margin));
        yPos += lineHeight;
      });

      // Add images if available
      if (data?.signatureApplicant || data?.cnicFrontPic || data?.cnicBackPic) {
        yPos += lineHeight;
        pdf.setFont("helvetica", "bold");
        safeText("Attached Documents", margin, yPos);
        pdf.setFont("helvetica", "normal");
        yPos += lineHeight;

        const imageWidth = (pageWidth - (2 * margin) - 20) / 2;
        const imageHeight = 150;

        try {
          if (data?.signatureApplicant) {
            const img = new Image();
            img.src = `${API_BASE_URL}/${data.signatureApplicant}`;
            await new Promise((resolve) => {
              img.onload = resolve;
            });
            safeText("Applicant Signature:", margin, yPos);
            yPos += 20;
            pdf.addImage(img, 'JPEG', margin, yPos, imageWidth, 100);
            yPos += 120;
          }

          if (data?.cnicFrontPic && data?.cnicBackPic) {
            const frontImg = new Image();
            frontImg.src = `${API_BASE_URL}/${data.cnicFrontPic}`;
            await new Promise((resolve) => {
              frontImg.onload = resolve;
            });
            
            const backImg = new Image();
            backImg.src = `${API_BASE_URL}/${data.cnicBackPic}`;
            await new Promise((resolve) => {
              backImg.onload = resolve;
            });

            safeText("CNIC Images:", margin, yPos);
            yPos += 20;
            pdf.addImage(frontImg, 'JPEG', margin, yPos, imageWidth, imageHeight);
            pdf.addImage(backImg, 'JPEG', margin + imageWidth + 20, yPos, imageWidth, imageHeight);
          }
        } catch (error) {
          console.error("Error adding images:", error);
        }
      }

      // Add footer
      const footerY = pdf.internal.pageSize.getHeight() - margin;
      pdf.setFontSize(10);
      safeText("Generated on: " + new Date().toLocaleDateString(), margin, footerY);

      pdf.save("disable_form_details.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
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
                    Disable Form
                  </div>
                </div>
              </div>
            </div>

            {/* Membership ID */}
            <div className="text-right mt-16 mr-4 font-semibold">
              Disalbe ID: {data?.serialNo}
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

            

            {/* CNIC Images Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {/* Front CNIC */}
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
          </form>
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

export default ViewDisablePopUp;
