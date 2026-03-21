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
            role: "user",
            content: `Create a professional resume for ${name} with skills: ${skills}`,
          },
        ],
      }),
    });

    const data = await response.json();
    
    // Fall back to a stunning mock layout if the user's OpenAI key runs out of quota or is invalid!
    if (data.error) {
       console.log("OpenAI API Error:", data.error.message);
       
       const mockResume = `
# ${name}
**Professional Software Engineer & Technologist**

---

> ⚠️ *Note: Your OpenAI API key ran out of credits or was rejected! This is a beautifully formatted sample resume to show you how the builder looks. To generate real resumes, please add credits to your OpenAI account.*

## Profile summary
Dynamically-driven professional with a deep passion for technology and building robust systems. Highly adaptable, proven ability to ship high-quality products under tight deadlines, and eager to leverage top-tier skills to push the boundaries of what's possible.

## Core Skills
${skills.split(',').map((s: string) => `- **${s.trim()}**`).join('\n')}

## Professional Experience

### Senior Developer | Tech Innovators Inc.
*2020 – Present*
- Spearheaded the complete overhaul of front-end infrastructure, resulting in a 40% performance increase.
- Architected a robust CI/CD pipeline, reducing deployment times from hours to minutes.
- Mentored junior engineers and led code review sessions enforcing clean coding standards.

### Junior Engineer | StartUp Labs
*2018 – 2020*
- Developed responsive web interfaces handling 10k+ daily active users.
- Collaborated closely with design teams to perfectly translate Figma wireframes to code.
- Successfully migrated legacy applications to modern React architectures.

## Education
**B.S. in Computer Science**
*University of Engineering, 2018*
- Graduated with honors (Cum Laude).
- Specialized in modern web technologies and elegant software patterns.
       `;
       
       return Response.json({
         result: mockResume.trim(),
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