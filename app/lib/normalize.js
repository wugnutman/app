/**
 * Used for scaling of fonts, width, height etc. according to Guideline sizes.
 */

import { width, height } from './device';

const scale = width / 414;

// Used for fonts
function normalize(size: number): number {
  return Math.round(scale * size);
}

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 736;

// Used for Horizontal and Vertical scale
const normalScale = size => width / guidelineBaseWidth * size;      // For Horizontal scale
const verticalScale = size => height / guidelineBaseHeight * size;  // For Vertical scale
const moderateScale = (size, factor = 0.5) => size + (normalScale(size) - size) * factor; // For Moderate scale

export default normalize;
export { normalScale, verticalScale, moderateScale };