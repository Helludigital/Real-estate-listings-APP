export const colors = {
primary: '#007AFF', primaryLight: '#4A90E2', primaryDark: '#0056CC',
background: '#F8F9FA', cardBackground: '#FFFFFF', secondaryBackground: '#F1F3F4',
textPrimary: '#000000', textSecondary: '#1F1F1F', textTertiary: '#666666', textDisabled: '#9CA3AF',
border: '#E5E7EB', divider: '#F3F4F6',
success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6',
shadow: 'rgba(0,0,0,0.1)', shadowDark: 'rgba(0,0,0,0.15)'
};
export const spacing = { xs:4, sm:8, md:12, lg:16, xl:24, xxl:32, giant:48 };
export const typography = {
title:{ fontSize:28, fontWeight:'700' as const, fontFamily:'System' },
h1:{ fontSize:24, fontWeight:'600' as const, fontFamily:'System' },
h2:{ fontSize:20, fontWeight:'600' as const, fontFamily:'System' },
body:{ fontSize:16, fontWeight:'400' as const, fontFamily:'System' },
caption:{ fontSize:14, fontWeight:'400' as const, fontFamily:'System' }
};
export const shadows = {
small:{ shadowColor:colors.shadow, shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:4, elevation:2 },
medium:{ shadowColor:colors.shadow, shadowOffset:{width:0,height:4}, shadowOpacity:0.15, shadowRadius:8, elevation:4 },
large:{ shadowColor:colors.shadow, shadowOffset:{width:0,height:8}, shadowOpacity:0.2, shadowRadius:16, elevation:8 }
};
export const borderRadius = { sm:4, md:8, lg:12, xl:16, full:999 };
export default { colors, spacing, typography, shadows, borderRadius };
