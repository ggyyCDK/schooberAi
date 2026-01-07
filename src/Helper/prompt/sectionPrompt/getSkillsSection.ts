export interface SkillMetadata {
    name: string
    description: string
    path: string
}

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&apos;")
}

/**
 * Generate the skills section for the system prompt.
 *
 * @param skills - The list of available skills
 */
export function getSkillsSection(skills: SkillMetadata[]): string {
    if (!skills || skills.length === 0) return ""

    const skillsXml = skills
        .map((skill) => {
            const name = escapeXml(skill.name)
            const description = escapeXml(skill.description)
            const location = escapeXml(skill.path)
            return `  <skill>\n    <name>${name}</name>\n    <description>${description}</description>\n    <location>${location}</location>\n  </skill>`
        })
        .join("\n")

    return `====

AVAILABLE SKILLS

<available_skills>
${skillsXml}
</available_skills>

<mandatory_skill_check>
REQUIRED PRECONDITION

Before producing ANY user-facing response, you MUST perform a skill applicability check.

Step 1: Skill Evaluation
- Evaluate the user's request against ALL available skill <description> entries in <available_skills>.
- Determine whether at least one skill clearly and unambiguously applies.

Step 2: Branching Decision

<if_skill_applies>
- Select EXACTLY ONE skill.
- Prefer the most specific skill when multiple skills match.
- Read the full SKILL.md file at the skill's <location>.
- Load the SKILL.md contents fully into context BEFORE continuing.
- Follow the SKILL.md instructions precisely.
- Do NOT respond outside the skill-defined flow.
</if_skill_applies>

<if_no_skill_applies>
- Proceed with a normal response.
- Do NOT load any SKILL.md files.
</if_no_skill_applies>

CONSTRAINTS:
- Do NOT load every SKILL.md up front.
- Load SKILL.md ONLY after a skill is selected.
- Do NOT skip this check.
- FAILURE to perform this check is an error.
</mandatory_skill_check>

<internal_verification>
This section is for internal control only.
Do NOT include this section in user-facing output.

After completing the evaluation, internally confirm:
<skill_check_completed>true|false</skill_check_completed>
</internal_verification>
`
}
