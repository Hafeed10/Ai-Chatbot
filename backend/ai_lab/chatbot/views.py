from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from groq import Groq

@csrf_exempt
def ai_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_input = data.get('message', '')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        if not user_input:
            return JsonResponse({'error': 'No message provided'}, status=400)

        # Initialize the Groq client
        client = Groq(api_key="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")  # Replace with your Groq API key

        # Call the Groq API with user input
        try:
            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": user_input},
                ],
                model="llama3-8b-8192",
            )
            response_content = chat_completion.choices[0].message.content
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

        # Format the response to add structure (spacing or line breaks)
        formatted_response = response_content.replace("\n", "<br/>")  # Example of formatting with HTML line breaks
        structured_response = {
            'response': response_content,
            'formatted_response': formatted_response,
        }

        # Return the chatbot's structured response
        return JsonResponse(structured_response)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
