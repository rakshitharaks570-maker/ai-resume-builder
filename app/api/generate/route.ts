import { GoogleGenerativeAI } from "@google/generative-ai";

function getMockResume(name: string, skills: string) {
  return {
    name: name || "NAME NOT SPECIFIED",
    title: "Senior Full Stack Engineer",
    summary: "Performance-oriented developer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Infrastructure with a passion for clean code and exceptional user experiences.",
    contact: {
      email: "hello@example.com",
      phone: "+1 (555) 000-1111",
      location: "San Francisco, CA"
    },
    skills: skills ? skills.split(',').map((s: string) => s.trim()) : ["React", "Next.js", "TypeScript"],
    experience: [
      {
        company: "Tech Innovators Inc.",
        role: "Senior Developer",
        period: "2020 – Present",
        description: [
          "Spearheaded the complete overhaul of front-end infrastructure, resulting in a 40% performance increase.",
          "Architected a robust CI/CD pipeline, reducing deployment times from hours to minutes.",
          "Mentored junior engineers and led code review sessions enforcing clean coding standards."
        ]
      },
      {
        company: "StartUp Labs",
        role: "Junior Engineer",
        period: "2018 – 2020",
        description: [
          "Developed responsive web interfaces handling 10k+ daily active users.",
          "Collaborated closely with design teams to perfectly translate Figma wireframes to code.",
          "Successfully migrated legacy applications to modern React architectures."
        ]
      }
    ],
    education: [
      {
        school: "University of Engineering",
        degree: "B.S. in Computer Science",
        year: "2018",
        description: "Graduated with honors (Cum Laude)."
      }
    ]
  };
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
  let name = "";
  let skills = "";
  
  try {
    const body = await req.json();
    name = body.name;
    skills = body.skills;

    if (!process.env.GOOGLE_API_KEY) {
       console.log("GOOGLE_API_KEY is missing. Using high-fidelity mock fallback.");
       return Response.json({ result: getMockResume(name, skills) });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Create a professional resume for ${name} with skills: ${skills}. 
    Return a JSON object with this structure: 
    {
      "name": "${name}",
      "title": "A professional job title",
      "summary": "A 2-3 sentence professional summary",
      "contact": { "email": "user@example.com", "phone": "123-456-7890", "location": "City, Country" },
      "skills": ["Skill 1", "Skill 2", ...],
      "experience": [{ "company": "Company Name", "role": "Job Title", "period": "2020 - Present", "description": ["Achievement 1", "Achievement 2"] }],
      "education": [{ "school": "University Name", "degree": "Degree Name", "year": "2020" }]
    }
    IMPORTANT: Provide ONLY the JSON object. No other text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown code block markers
    const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
    
    try {
      const resumeData = JSON.parse(jsonString);
      return Response.json({ result: resumeData });
    } catch (parseError) {
      console.error("Gemini JSON Parse Error:", parseError);
      return Response.json({ result: getMockResume(name, skills) });
    }

  } catch (error: any) {
    console.log("Gemini Generation Error:", error);
    return Response.json({ result: getMockResume(name, skills) });
  }
}
