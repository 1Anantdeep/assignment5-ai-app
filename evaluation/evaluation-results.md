# Prompt Improvement

## Before
The prompt was simple and did not strictly restrict the model to the context.

Example:
Answer the question based on the context.

## Problem
The model could sometimes guess or give answers outside the PDF content.

## After
The prompt was improved to include strict rules:
- Answer only from context
- Do not guess
- Say when information is missing

## Result
After improvement:
- Answers became more accurate
- Hallucination reduced
- The model stayed within the PDF content