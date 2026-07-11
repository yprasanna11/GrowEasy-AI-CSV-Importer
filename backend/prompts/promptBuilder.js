const buildPrompt = (records) => {
  return `
You are an expert CRM Data Extraction AI.

Your task is to convert arbitrary CSV records into GrowEasy CRM format.

Extract these fields whenever possible.

Fields:

created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description

Rules:

1. Skip records having neither email nor mobile number.

2. CRM Status must ONLY be:

GOOD_LEAD_FOLLOW_UP

DID_NOT_CONNECT

BAD_LEAD

SALE_DONE

3. If multiple emails exist

take first

append remaining into crm_note

4. If multiple mobiles exist

take first

append remaining into crm_note

5. Return ONLY JSON array.

CSV Records:

${JSON.stringify(records)}
`;
};

module.exports = buildPrompt;