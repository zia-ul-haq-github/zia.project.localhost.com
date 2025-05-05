<ProFormUploadDragger
    name={ 'paymen_proof_image_url' }
	label="Upload Payment Proof"
    max={1}
    title={'Click or drag files into this area to upload'}
    description={'Supported extension: .jpg .png .docx'}
    accept={'.jpg, .png, .docx'}
    rules={[{ required: true, message: 'Please upload payment proof image' }]}
    colProps={{xs: 24, sm: 24, md: 24, lg: 24, xl: 24}}
    action= {(SITE_URL+"/wp-json/wp/v2/form-document/")}
    onChange={ async (info) => {
        if (info.file.status === 'done') {
            setFormDocumentDetails(info.file.response.data);
        }
    }}
/>