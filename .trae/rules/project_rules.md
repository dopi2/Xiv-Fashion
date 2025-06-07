# Project-Specific AI Rules

## Changelog Enforcement
- Maintain `CHANGELOG.md` in root directory
- Update for:
  - Version releases
  - Database schema changes
  - API modifications
  - Dependency updates
- Follow Keep a Changelog standards (keepachangelog.com)

## Code Modification Policy
- **Change Protocol**:
  1. First display diff of proposed changes
  2. Get explicit approval before implementing
  3. Create backup copy if modifying critical files
- **Code Preservation**:
  - Never remove:
    - Existing error handling
    - Performance optimizations
    - Security measures
  - Only deprecate code after thorough review

## Focus Parameters
- **Current Priority**: [Insert current project focus]
- **Off-Limits Areas**: [List any code/components not to modify]
- **Strict Requirements**: [List any unchanging project constraints]

## Development Safeguards
- Before any modification:
  - Verify no existing functionality will be broken
  - Check for dependent code
  - Ensure backward compatibility when needed