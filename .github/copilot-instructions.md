# Layout Prompt Template (Nuxt UI + MCP)

You are generating a Nuxt frontend layout.  
**Nuxt UI MCP is the authoritative source** for all UI components.

- Do **not** invent props, slots, events, or variants  
- Always query the **Nuxt UI MCP server** when selecting or implementing components  
- Prefer MCP data over assumptions or generic patterns  

---

## Project Context

- **Framework:** Nuxt 4  
- **UI Library:** Nuxt UI  
- **Backend:** Directus  
- **Testing:** Vitest  
- **Architecture:** API-driven frontend  
- **API Style:** Composition API with `<script setup>`

---

## Instructions

### 1. Define the layout goal

Describe the layout clearly and explicitly.

**Example goals:**
- Dashboard layout  
- Top navigation header  
- Left sidebar navigation  
- Main content area with cards  

---

### 2. Query Nuxt UI MCP for components

Use MCP tools to identify appropriate components before writing code.

**Example MCP queries:**
- `find_component_for_usecase("application header")`
- `find_component_for_usecase("sidebar navigation")`
- `find_component_for_usecase("card layout")`
- `find_component_for_usecase("responsive container")`

For each component, retrieve:
- Component name  
- Props  
- Slots  
- Events  
- Example usage  

---

### 3. Generate the layout implementation

**Requirements:**
- Use `<script setup>`
- Follow Nuxt directory conventions  
  - `layouts/`
  - `pages/`
  - `components/`
- Use **only** components and props verified via MCP
- Respect SSR vs CSR boundaries
- Keep components small and composable
- Do not create custom UI if Nuxt UI provides an equivalent

Add a comment in the implementation indicating MCP verification:

- Nuxt UI components verified via MCP

---

### 4. Integrate Directus data (if applicable)

- Query only verified Directus collections and fields
- Map API responses explicitly
- Handle loading, empty, and error states
- Avoid speculative or inferred schema fields

---

### 5. Add Vitest tests

**Testing rules:**
- Use Vitest
- Test:
  - Composables with logic
  - Conditional rendering
  - User interactions
  - Data mapping from Directus
- Mock Directus API calls explicitly
- Do **not** test Nuxt UI internals
- Test behavior, not implementation details

Include:
- Component tests
- Composable tests where logic exists

---

## Example Prompt to Copilot

Generate a dashboard layout with:
- A responsive top navigation header
- A collapsible left sidebar
- A main content area displaying cards populated from Directus

Use Nuxt UI components verified via MCP.  
Include Vitest tests for conditional rendering and data mapping.  
Follow Nuxt 4 best practices.
