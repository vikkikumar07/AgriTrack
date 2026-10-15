const ai = require("../../config/ai");
const Farming = require("../../models/farmer/farming.schema");

let farmingTasks = async (req, res) => {
  try {
    const { crop, soil, plantingDate, location, area } = req.body;
    const { userId } = req.user;
    if (!crop || !soil || !plantingDate || !location || !area) {
      return res.status(400).json({
        message: "All farmer details are required",
      });
    }

    const prompt = `
          You are a professional agricultural crop planning assistant
          for a Smart Farm Management Platform.

          Your job is to generate a realistic, crop-specific farming
          schedule from early crop growth through harvesting and
          post-harvest activities.

          FARMER INPUT:
          Crop: ${crop}
          Soil Type: ${soil}
          Planting Date: ${plantingDate}
          Location: ${location}
          Field Area: ${area} acres

          OBJECTIVE:
          Generate a chronological list of actionable farming tasks
          that helps the farmer understand what to do, when to do it,
          how much material may be required, and how to perform the task.

          The farmer has already provided the planting date.
          Do not generate a separate sowing task on that date.
          Generate tasks scheduled strictly after the planting date.

          DATE RULES:
          1. Every dueDate must be strictly later than plantingDate.
          2. Use only real calendar dates in YYYY-MM-DD format.
          3. Sort all tasks by dueDate in ascending order.
          4. Generate dates according to the crop lifecycle and
            reliable agricultural guidance for the specified location.
          5. Do not invent weather conditions, rainfall, soil test results,
            pest outbreaks or other unavailable information.
          6. Include an estimated harvesting task and relevant
            post-harvest tasks.
          7. Do not generate duplicate or irrelevant tasks.
          8. If reliable timing is unavailable, do not fabricate
            a precise agricultural recommendation.

          TASK REQUIREMENTS:
          Generate relevant tasks covering:
          - Early crop establishment and germination monitoring.
          - Crop growth and health inspections.
          - Irrigation planning and soil moisture checks.
          - Fertilizer and nutrient management.
          - Weed monitoring and control.
          - Pest and disease monitoring.
          - Crop-stage-specific care.
          - Harvest readiness and harvesting.
          - Threshing, drying and storage where applicable.

          Do not prescribe unnecessary spraying or chemical applications.
          Prefer preventive monitoring and integrated pest management.

          QUANTITY RULES:
          1. Every task MUST contain a quantity field.
          2. Quantity must be a string.
          3. Calculate material quantities using the provided field area
            and verified agricultural recommendations when applicable.
          4. The field area is provided in acres.
          5. Convert units carefully and clearly state the unit.
          6. If a task requires a material, specify the recommended
            amount only when reliable guidance and sufficient information
            are available.
          7. Do not assume crop variety, irrigation method, nutrient status,
            water availability or other missing details.
          8. Never invent exact fertilizer, pesticide, herbicide or
            chemical doses.
          9. Chemical recommendations must follow applicable registered
            product labels, approved crop uses and safety instructions.
          10. If a task does not require any material quantity, return:
              "Not required".
          11. If a quantity is relevant but cannot be safely determined,
              return:
              "Not specified - additional information required".
          12. For water, fertilizer and chemical tasks, clearly distinguish
              between a verified recommendation and an estimate.
          13. Never present an unsupported estimate as a confirmed dose.

          QUANTITY EXAMPLES:
          - "20 kg total for 2 acres" only when supported by a verified
            recommendation.
          - "Not required" for a visual crop inspection.
          - "Not specified - additional information required" when a
            required amount cannot be determined safely.

          DESCRIPTION RULES:
          1. Explain what the farmer should do and why.
          2. Use clear, practical, farmer-friendly English.
          3. Mention the relevant crop growth stage where known.
          4. Include useful instructions for carrying out the task.
          5. For fertilizer or chemical tasks, explain their purpose.
          6. Include safety precautions when applicable.
          7. Do not invent chemical brands, doses, weather conditions
            or guaranteed crop outcomes.
          8. If additional details or expert verification are needed,
            explicitly mention this in the description.

          OUTPUT FORMAT:
          Return ONLY valid JSON.
          Do not return Markdown, comments, explanations or code fences.

          Use exactly this structure:

          {
            "tasks": [
              {
                "title": "Clear task name",
                "dueDate": "YYYY-MM-DD",
                "quantity": "Amount with unit, Not required, or Not specified - additional information required",
                "description": "Actionable farming instructions and relevant precautions"
              }
            ]
          }

          FINAL VALIDATION:
          - Return a top-level tasks array.
          - Every task must contain exactly these four fields:
            title, dueDate, quantity, description.
          - All fields must contain strings.
          - Every dueDate must be a valid calendar date strictly
            later than ${plantingDate}.
          - Dates must be in chronological order.
          - All tasks must be relevant to ${crop}.
          - Quantities must account for ${area} acres only when supported
            by reliable recommendations.
          - Do not invent unsupported quantities or chemical doses.
          - Do not create a separate sowing task.
          - Return a complete, realistic crop lifecycle schedule.
          `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text);

    const farmingData = new Farming({
      crop,
      soil,
      area,
      plantingDate,
      location,
      userId,
      tasks: result.tasks, // aapka generated object
    });

    await farmingData.save();

    res
      .status(201)
      .json({ message: "Generate Data successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Task generate failed",
      success: false,
    });
  }
};

module.exports = farmingTasks;
