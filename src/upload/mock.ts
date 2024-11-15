import { http, HttpResponse } from "msw";
import { uploadServiceLocation } from "./constants";

const postDocument = http.post(uploadServiceLocation, async (resolver) => {
	console.log('MSW resolve');

	const data = await resolver.request.formData();

	const file = data.get('file');
    
	if (file instanceof File) {
		console.log('MSW file', file.name);
		const fileContentStream = file.stream();
		const reader = fileContentStream.getReader();
        
        const rStream = await reader.read();
        console.log(rStream.value);
	}

	return new HttpResponse(null, { status: 200});
});

export const uploadDocumentMocks = [postDocument];