# AGENTS.md

## Project context

This is a beginner-level React project.
The main goal is to build the project cleanly, safely, and in a way that helps the developer learn.

The developer already knows:

- HTML
- CSS
- JavaScript
- basic React

This project may already contain:

- multiple pages
- routing
- shared components
- folders with an unfinished structure

## Main working principles

- Keep solutions simple, readable, and beginner-friendly.
- Prefer small safe edits over large rewrites.
- Reuse existing components, folders, and naming patterns whenever possible.
- Do not refactor unrelated files.
- Do not introduce advanced architecture unless it is clearly necessary.
- Do not add new libraries unless absolutely necessary.
- Keep the existing project style consistent.

## Before making changes

- First analyze the task.
- Then write a short plan.
- Check whether the needed logic or UI already exists somewhere in the project.
- If a change may affect routing, shared layout, or multiple pages, explain the impact first.
- When the request is unclear, make the safest minimal assumption and keep changes limited.

## Implementation rules

- Follow the current folder structure unless there is a strong reason to improve it.
- Prefer clear component names and clear prop names.
- Prefer simple, maintainable React patterns.
- Avoid overengineering.
- Avoid creating deeply nested abstractions for a small project.
- Keep components focused and reasonably small.
- If code is repeated, suggest or create a small reusable component only when it clearly improves readability.
- Do not move many files unless the task specifically requires it.

## Routing rules

- Keep routing changes minimal and easy to understand.
- Reuse existing layout structure if possible.
- When adding a page, update only the necessary routing files.
- Do not redesign the whole routing system for a small task.
- If a route is temporary or likely to change later, keep the solution flexible but simple.

## Component rules

- Prefer reusable UI when repetition is obvious.
- Keep JSX readable.
- Avoid heavy logic directly inside JSX when it hurts readability.
- Use props clearly and consistently.
- Do not create overly generic components too early.

## Styling rules

- Keep styling consistent with the existing project.
- Prefer reuse of existing classes, patterns, and spacing decisions.
- Do not restyle unrelated pages or sections.
- Fix layout and responsive issues with minimal necessary edits.

## File safety rules

- Touch only files relevant to the task.
- Do not rename, move, or delete files unless needed.
- Do not change unrelated imports, formatting, or code structure just for preference.
- Preserve working code whenever possible.

## Validation

After making changes:

- run the relevant checks if available
- verify that the edited code is consistent
- look for obvious bugs, broken imports, invalid routes, and JSX mistakes
- make sure the solution matches the original task

If the project has lint, build, or test commands, run the relevant ones before finishing.

## Output format

After completing a task, always provide:

1. a short summary of what changed
2. why this approach was chosen
3. which files were touched
4. anything the developer should learn from this change
5. any risks or follow-up improvements, if relevant

## Learning mode

This developer is still learning.
When possible:

- explain decisions in simple language
- point out mistakes clearly
- explain how to notice similar issues next time
- prefer educational clarity over clever solutions

## Data audit mode

When the task is about auditing, reviewing, or improving the data layer:

- First inspect the actual current codebase before suggesting changes.
- Analyze real data usage across pages, components, cards, forms, routes, filters, and detail views.
- Check both dedicated data files and hardcoded content inside components.
- Do not implement changes unless explicitly asked.
- Do not invent architecture that is not justified by the current project.

### Data review goals

- Identify the real entities the app actually needs.
- Identify where data currently lives and where it is duplicated or inconsistent.
- Distinguish clearly between:
  - source data
  - derived/computed data
  - local UI state
  - temporary demo/mock values
- Identify missing fields that would better support the existing UI and user flows.
- Identify fields that are unnecessary or too advanced for this project right now.
- Review relationships between entities and point out weak or missing links.

### Data modeling rules

- Prefer a frontend-first data model using simple JavaScript arrays and objects.
- Keep recommendations beginner-friendly and portfolio-friendly.
- Do not over-normalize unless it clearly improves the current project.
- Do not propose backend schemas, API contracts, auth systems, CMS design, or service-layer architecture unless explicitly requested.
- Do not recommend Redux, Zustand, reducers everywhere, or global abstractions unless there is a real current need.
- Prefer practical realism over theoretical completeness.

### Recommendation style

- Base recommendations on the actual current code, not generic best practices.
- Mention real files, pages, or components when relevant.
- Be concrete and opinionated.
- Prefer the minimum realistic data foundation that makes the app coherent and believable.
- Highlight the highest-priority improvements first.
- Clearly separate:
  - improve now
  - leave for later
  - unnecessary / overengineering
