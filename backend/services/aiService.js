async function extractCRM(records) {

  const crmData = [];

  records.forEach((record) => {

    crmData.push({

      created_at: new Date().toLocaleString(),

      name:
        `${record["First Name"] || ""} ${record["Last Name"] || ""}`.trim(),

      email: record["Email"] || "",

      country_code: "+91",

      mobile_without_country_code: record["Phone"] || "",

      company: record["Company"] || "Not Available",

      city: record["City"] || "Not Available",

      state: record["State"] || "Not Available",

      country: "India",

      lead_owner: "Admin",

      crm_status: "GOOD_LEAD_FOLLOW_UP",

      crm_note: "Imported using GrowEasy AI CSV Importer",

      data_source: "CSV Upload",

      possession_time: "",

      description: "Lead Imported Successfully"

    });

  });

  return crmData;

}

module.exports = extractCRM;