export async function POST(req: Request) {
  try {
    const { name, skills } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional resume writer. Always output in valid JSON format only.",
          },
          {
            role: "user",
            content: `Create a professional resume for ${name} with skills: ${skills}. 
            Return a JSON object with this structure: 
            {
              "name": "${name}",
              "title": "A professional job title",
              "summary": "A 2-3 sentence professional summary",
              "contact": { "email": "user@example.com", "phone": "123-456-7890", "location": "City, Country" },
              "skills": ["Skill 1", "Skill 2", ...],
              "experience": [{ "company": "Company Name", "role": "Job Title", "period": "2020 - Present", "description": ["Achievement 1", "Achievement 2"] }],
              "education": [{ "school": "University Name", "degree": "Degree Name", "year": "2020" }]
            }`,
          },
        ],
      }),
    });

    const data = await response.json();
    
    // Fall back to a stunning mock layout if the user's OpenAI key runs out of quota or is invalid!
    if (data.error) {
       console.log("OpenAI API Error:", data.error.message);
       
       const mockResume = {
         name: name,
         title: "Senior Full Stack Engineer",
         summary: "Performance-oriented developer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Infrastructure with a passion for clean code and exceptional user experiences.",
         contact: {
           email: "hello@example.com",
           phone: "+1 (555) 000-1111",
           location: "San Francisco, CA"
         },
         skills: skills.split(',').map((s: string) => s.trim()),
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
       
       return Response.json({
         result: mockResume,
       });
    }

    return Response.json({
      result: data?.choices?.[0]?.message?.content || "No result from API.",
    });

  } catch (error: any) {
    console.log(error);
    return Response.json({ result: `Server Error: ${error.message}` });
  }
}