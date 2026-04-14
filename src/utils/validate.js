import validateNpmPackageName from 'validate-npm-package-name';

export function validateProjectName(name) {
  if (!name || name.trim() === '') {
    return { valid: false, errors: ['Project name cannot be empty.'], warnings: [] };
  }

  const trimmed = name.trim();

  if (trimmed.startsWith('/') || trimmed.startsWith('\\')) {
    return {
      valid: false,
      errors: ['Project name cannot be an absolute path.'],
      warnings: [],
    };
  }

  if (trimmed.startsWith('.')) {
    return {
      valid: false,
      errors: ['Project name cannot start with a dot.'],
      warnings: [],
    };
  }

  if (trimmed.length > 214) {
    return {
      valid: false,
      errors: ['Project name is too long (max 214 characters).'],
      warnings: [],
    };
  }

  const result = validateNpmPackageName(trimmed);
  const errors = [];
  const warnings = [];

  if (!result.validForNewPackages) {
    (result.errors || []).forEach((e) => errors.push(e));
    (result.warnings || []).forEach((w) => warnings.push(w));
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
