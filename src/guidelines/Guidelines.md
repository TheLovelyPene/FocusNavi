# FocusNavi Design Guidelines

## Accessibility First Principles

1. **Clear, Concise Language**
   - Use simple, direct instructions
   - Avoid ambiguous terms like "soon" or "over there"
   - Provide specific measurements and counts

2. **Visual Hierarchy**
   - Current instruction should be the most prominent element
   - Use large, high-contrast text
   - Employ consistent color coding for different types of information

3. **Reduced Cognitive Load**
   - Limit the amount of information displayed at once
   - Group related information
   - Use progressive disclosure for complex instructions

4. **Multimodal Communication**
   - Combine text, symbols, and audio
   - Ensure each mode can stand alone
   - Allow users to customize which modes they prefer

5. **Contextual Awareness**
   - Provide environmental descriptions
   - Include accessibility features of the route
   - Warn about potential obstacles or challenges

## UI Component Guidelines

### Text
- Minimum font size: 16px (body), 24px (instructions)
- High contrast: Use dark text on light backgrounds (4.5:1 ratio minimum)
- Sans-serif fonts only

### Buttons
- Minimum touch target: 44px × 44px
- Clear visual feedback on hover/focus/press
- Descriptive labels (avoid "Click Here")

### Navigation Arrows
- Large and prominent
- Simple, universally recognized shapes
- Consistent positioning

### Color Usage
- Primary actions: Blue (#3B82F6)
- Warnings/Cancel: Red (#EF4444)
- Path descriptions: Green (#10B981)
- Lane guidance: Blue (#3B82F6)
- AI responses: Purple (#8B5CF6)

## Voice and Tone
- **Friendly but professional**
- **Consistent terminology**
- **Proactive rather than reactive**
- **Positive framing** ("Cross at the accessible crossing" rather than "Don't use the stairs")
- **Confirmation of user actions**

## Testing Requirements
1. Test with screen readers
2. Verify color contrast meets WCAG AA standards
3. Ensure all functionality is available via keyboard
4. Test with various font size settings
5. Verify performance on slow connections