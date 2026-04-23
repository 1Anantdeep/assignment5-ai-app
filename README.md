## Assignment 6 Evaluation and Improvement

For Assignment 6, I evaluated the Smart PDF Helper system using 5 representative cases and 2 failure cases.

The system performed well for clear PDF-based questions, summaries, and source-based answers. It was weaker when the user asked vague questions or questions outside the PDF content.

I compared the final retrieval-based system with a simple prompt-only baseline. The retrieval-based system was more accurate because it used relevant PDF chunks before generating an answer.

Based on this evaluation, I improved the prompt so the model answers only from the provided PDF context and avoids guessing when information is missing.