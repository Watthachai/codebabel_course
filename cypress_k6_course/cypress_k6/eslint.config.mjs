import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  rules: {
    'node/prefer-global/process': 'off', // Disable rule that requires process to be global
    'no-unused-expressions': 'off', // Disable rule that disallows unused expressions
  },
})
