/**
 * Utility functions for managing cursor states in components
 */

export interface CursorState {
  type: 'default' | 'pointer' | 'text' | 'not-allowed' | 'wait' | 'move' | 'resize'
  isDisabled?: boolean
  isLoading?: boolean
  isInteractive?: boolean
}

/**
 * Get the appropriate cursor class based on component state
 */
export function getCursorClass(state: CursorState): string {
  if (state.isDisabled) {
    return 'cursor-not-allowed'
  }

  if (state.isLoading) {
    return 'cursor-wait'
  }

  switch (state.type) {
    case 'pointer':
      return 'cursor-pointer'
    case 'text':
      return 'cursor-text'
    case 'not-allowed':
      return 'cursor-not-allowed'
    case 'wait':
      return 'cursor-wait'
    case 'move':
      return 'cursor-move'
    case 'resize':
      return 'cursor-resize'
    default:
      return 'cursor-default'
  }
}

/**
 * Get cursor class for interactive elements (buttons, links, etc.)
 */
export function getInteractiveCursorClass(isDisabled?: boolean, isLoading?: boolean): string {
  return getCursorClass({
    type: 'pointer',
    isDisabled,
    isLoading
  })
}

/**
 * Get cursor class for form inputs
 */
export function getInputCursorClass(isDisabled?: boolean): string {
  return getCursorClass({
    type: 'text',
    isDisabled
  })
}

/**
 * Combine cursor class with existing classes
 */
export function combineWithCursorClass(existingClasses: string, cursorState: CursorState): string {
  const cursorClass = getCursorClass(cursorState)
  return `${existingClasses} ${cursorClass}`
}
