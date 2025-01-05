import { PDFDocument, rgb } from "pdf-lib";
// import data from "./1111jason.json";
import { IQTestResultTem1, Poppins_Bold} from "../../assets";
import * as fontkit from "fontkit";


// Error function (erf) implementation
function erf(x) {
  const a = 0.147;
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1 / (1 + a * x);
  const result = 1 - (((((1. + 0.278393 * t) + 0.230389 * t * t) - 0.000972 * t * t * t) - 0.078108 * t * t * t * t) * Math.exp(-x * x));

  return sign * result;
}

const topicIds = {
  "Logical Reasoning": "67526dd396614be3a886aac6",
  "Verbal Comprehension": "67526dd396614be3a886aac7",
  "Working Memory": "67526dd396614be3a886aac8",
  "Spatial Reasoning": "67526dd396614be3a886aac9",
};

const feedbackThresholds = [
  { minScore: Infinity, feedback: "Excellent" },
  { minScore: 7, feedback: "Very Good" },
  { minScore: 5, feedback: "Good" },
  { minScore: 3, feedback: "Should Improve" },
  { minScore: -Infinity, feedback: "Need to Work Hard" },
];

const iqCategories = [
  { minIQ: 130, category: "Very High - (Gifted)", description: `Individuals who score in this range often excel /n in academic and problem-solving tasks.` },
  { minIQ: 120, category: "High Average", description: "Above average intelligence, often seen in successful professionals." },
  { minIQ: 110, category: "Average - High", description: "Generally capable of handling complex tasks and reasoning." },
  { minIQ: 90, category: "Average", description: "Represents the majority of the population, competent in daily tasks." },
  { minIQ: 80, category: "Below Average", description: `May face challenges with more \n complex reasoning and problem-solving tasks.` },
  { minIQ: 70, category: "Low Average", description: "Individuals in this range might require assistance in academic settings." },
  { minIQ: -Infinity, category: "Very Low", description: "Significantly below average; may qualify for special education services." },
];

// Calculate scores and results
function calculateScores(data) {
  if (!data || !data.answeredQuestions || !data.questionsList) {
    throw new Error("Invalid data. Please check the imported JSON file.");
  }

  const scores = {
    "Logical Reasoning": 0,
    "Verbal Comprehension": 0,
    "Working Memory": 0,
    "Spatial Reasoning": 0,
  };

  const totalQuestions = {
    "Logical Reasoning": 0,
    "Verbal Comprehension": 0,
    "Working Memory": 0,
    "Spatial Reasoning": 0,
  };

  data.answeredQuestions.forEach((answered) => {
    const question = data.questionsList.find((q) => q._id === answered.questionId);
    if (question) {
      const topic = Object.keys(topicIds).find((key) => question.topics.includes(topicIds[key]));
      if (topic) {
        totalQuestions[topic]++;
        if (answered.correct) {
          scores[topic]++;
        }
      }
    }
  });

  const percentages = {};
  const feedback = {};
  let totalScore = 0;
  let totalPossible = 0;

  Object.keys(scores).forEach((topic) => {
    const percentage = ((scores[topic] / (totalQuestions[topic] || 1)) * 100).toFixed(2);
    percentages[topic] = percentage;

    const threshold = feedbackThresholds.find((t) => scores[topic] >= t.minScore);
    feedback[topic] = threshold ? threshold.feedback : "Unknown";

    totalScore += scores[topic];
    totalPossible += totalQuestions[topic];
  });

  const totalPercentage = ((totalScore / (totalPossible || 1)) * 100).toFixed(2);
  const userIQ = data.IQscore;

  // Calculate z-score and percentage above the general population
  const mean = 100;
  const stdDev = 15;
  const zScore = (userIQ - mean) / stdDev;
  const percentile = 0.5 + (0.5 * erf(zScore / Math.sqrt(2)));
  const percentageAbove = ((1 - percentile) * 100).toFixed(2);

  const iqCategory = iqCategories.find((c) => userIQ >= c.minIQ);

  return {
    scores,
    percentages,
    feedback,
    totalScore,
    totalPossible,
    totalPercentage,
    userIQ,
    percentageAbove,
    iqCategory,
    totalQuestions,
  };
}

// PDF generation function
async function generatePdf(data, reportData) {
  if (!reportData || !reportData.scores || !reportData.percentages || !reportData.feedback || !reportData.totalQuestions) {
    console.error("Missing expected report data:", reportData);
    throw new Error("Incomplete report data.");
  }

  console.log("report data:", reportData);


  const fontBytes = await fetch(Poppins_Bold).then((res) => res.arrayBuffer());
  const existingPdfBytes = await fetch(IQTestResultTem1).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();


  // Main header text
  const text = `Hello, ${data.name}!`;
  const textWidth = customFont.widthOfTextAtSize(text, 24);
  const x = (width - textWidth) / 2;
  const y = 550;

  page.drawText(text, {
    x,
    y,
    size: 24,
    color: rgb(1, 0.76, 0),
    font: customFont,
  });
  // IQ Score text
  const iqScoreText = `Your IQ Score is ${reportData.userIQ}`;
  const iqScoreTextWidth = customFont.widthOfTextAtSize(iqScoreText, 24);
  const iqScoreTextX = (width - iqScoreTextWidth) / 2;
  const iqScoreTextY = y - 24 - 10;

  page.drawText(iqScoreText, {
    x: iqScoreTextX,
    y: iqScoreTextY,
    size: 24,
    color: rgb(1, 1, 1),
    font: customFont,
  });

  // Embed the chart image
  const chartImageBytes = await fetch(image).then((res) => res.arrayBuffer());
  const chartImageData = await pdfDoc.embedPng(chartImageBytes);
  const chartWidth = 500;
  const chartHeight = 280;
  const chartX = (width - chartWidth) / 2;
  const chartY = (height - chartHeight) / 2 - 90;

  page.drawImage(chartImageData, {
    x: chartX,
    y: chartY,
    width: chartWidth,
    height: chartHeight,
  });

  //Words under the Chart
  const iqQuote = `"${reportData.iqCategory.description}"`;
  const iqQuoteWidth = customFont.widthOfTextAtSize(iqQuote, 18);
  const iqQuoteTextX = (width - iqQuoteWidth) / 2;
  const iqQuoteTextY = 150;
  const lines = iqQuote.split('\n'); 
  lines.forEach((line, index) => {
    const lineWidth = customFont.widthOfTextAtSize(line, 18); 
    const lineX = (width - lineWidth) / 2; 
    page.drawText(line, {
      x: lineX, 
      y: iqQuoteTextY - index * 20, 
      size: 18,
      color: rgb(1, 1, 1),
      font: customFont,
    });
  });


  //Words for Score Average
  const iqTotal = `"${reportData.iqCategory.category}"`;
  const iqTotalTextWidth = customFont.widthOfTextAtSize(iqTotal, 20);
  const iqTotalTextX = (width - iqTotalTextWidth) / 2;

  page.drawText(iqTotal, {
    x: iqTotalTextX, 
    y: 70, 
    size: 20, 
    color: rgb(0, 0, 0), 
    font: customFont,
    align: 'center', 
  });

  //Words for Score under
  const iqWords = `Your IQ is higher than ${reportData.percentageAbove}% of the general population.`;
  const iqWordsTextWidth = customFont.widthOfTextAtSize(iqWords, 12);
  const iqWordsTextX = (width - iqWordsTextWidth) / 2;

  page.drawText(iqWords, {
    x: iqWordsTextX,
    y: 30,
    size: 12,
    color: rgb(1, 1, 1),
    font: customFont,
    align: 'center',
  });

  const page1 = pdfDoc.getPages()[1];
  //In the boxes
  const FirstRow = reportData.feedback['Logical Reasoning']
  const SecondRow = reportData.feedback['Verbal Comprehension']
  const ThirdRow = reportData.feedback['Working Memory']
  const FourthRow = reportData.feedback['Spatial Reasoning']

  page1.drawText(FirstRow, {
    x: 375,
    y: 690,
    size: 12,
    color: rgb(0, 0, 0),
  })

  page1.drawText(SecondRow, {
    x: 375,
    y: 640,
    size: 12,
    color: rgb(0, 0, 0),
  })

  page1.drawText(ThirdRow, {
    x: 375,
    y: 590,
    size: 12,
    color: rgb(0, 0, 0),
  })

  page1.drawText(FourthRow, {
    x: 375,
    y: 540,
    size: 12,
    color: rgb(0, 0, 0),
  })

  const FirstRowPercentage = `${reportData.percentages['Logical Reasoning']}`
  const SecondRowPercentage = `${reportData.percentages['Verbal Comprehension']}`
  const ThirdRowPercentage = `${reportData.percentages['Working Memory']}`
  const FourthRowPercentage = `${reportData.percentages['Spatial Reasoning']}`

  page1.drawText(FirstRowPercentage, {
    x: 520,
    y: 690,
    size: 12,
    color: rgb(0, 0, 0),
  })

  page1.drawText(SecondRowPercentage, {
    x: 520,
    y: 640,
    size: 12,
    color: rgb(0, 0, 0),
  })

  page1.drawText(ThirdRowPercentage, {
    x: 520,
    y: 590,
    size: 12,
    color: rgb(0, 0, 0),
  })

  page1.drawText(FourthRowPercentage, {
    x: 520,
    y: 540,
    size: 12,
    color: rgb(0, 0, 0),
  })
  // Save the PDF document
  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

  return pdfBlob; // Return the Blob
}



// Main function
export const generateIqReport = async ({data,imageData}) => {
  const reportData = calculateScores(data);
  const pdfBlob = await generatePdf(data,reportData,imageData);
  return pdfBlob;
};
