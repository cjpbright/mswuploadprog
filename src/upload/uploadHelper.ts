import axios, { AxiosProgressEvent } from "axios"
import { uploadServiceLocation } from "./constants";

export const uploadDocument = (params: {
	targetFile: File,
	progressEvent?: (e: AxiosProgressEvent) => void,
	completeEvent?: () => void
}) => {
	console.log('Upload Start')

	const data = new FormData();
	data.append('file', params.targetFile);

	const wrappedProgress = (e: AxiosProgressEvent) => {
		if (params.progressEvent != null) {
			params.progressEvent(e);
		}
		console.log(`Upload Progress: ${e.loaded} / ${e.total}`);
	}

	axios(uploadServiceLocation,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data,
			onUploadProgress: wrappedProgress
		}).finally(() => {
			console.log('Upload Finally');
			if (params.completeEvent != null) {
				params.completeEvent();
			}
		});
}