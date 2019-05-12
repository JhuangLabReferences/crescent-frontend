import React, {useState} from 'react'

import {Modal, Button, Segment, Label, Grid} from 'semantic-ui-react'

import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

const UploadButton = ({
    label,   
    url, // Minio url
    uploadedFile,
    setUploadedFile
}) => (
    <>
        <Button icon='upload'
            color={R.isNil(uploadedFile) ? undefined : 'blue'}
            active={RA.isNotNil(uploadedFile)}
            content={R.isNil(uploadedFile) ? label : uploadedFile.name}
            as={'label'}
            htmlFor={label}
        />
        <input hidden id={label} type='file'
            onChange={
                (event) => {
                    const file = R.head(event.target.files)
                    // Send file to minio
                    const xhr = new XMLHttpRequest ()
                    xhr.open('PUT', url, true)
                    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*') 
                    xhr.withCredentials = true
                    const formData = new FormData()
                    formData.append('uploadedFile', file)
                    xhr.send(formData)
                    xhr.onload = () => {
                        if (xhr.status == 200) {setUploadedFile(file)}
                    }
                    console.log(event.target.files)
                }
            }
        />
    </>
)

const UploadModal = ({
    uploadedBarcodesFile,
    setUploadedBarcodesFile,
    uploadedGenesFile,
    setUploadedGenesFile,
    uploadedMatrixFile,
    setUploadedMatrixFile,
}) => {  
    const [openModal, setOpenModal] = useState(false)
    const allIsNotNull = R.all(RA.isNotNull)
    const uploads = [uploadedBarcodesFile, uploadedGenesFile, uploadedMatrixFile]
    return (
        <Modal
            open={openModal}
            trigger={
                <Button color='blue' content='Upload' icon='upload' labelPosition='left'
                    onClick={() => setOpenModal(true)}
                />
            }
        >
            <Modal.Header content='Upload files' />
            <Modal.Content >
                <Button.Group widths={3} size='massive'>
                    <UploadButton label='Barcodes' url='http://localhost:4001/upload/barcodes'
                        uploadedFile={uploadedBarcodesFile}
                        setUploadedFile={setUploadedBarcodesFile}
                    />
                    <UploadButton label='Genes' url='http://localhost:4001/upload/genes' 
                        uploadedFile={uploadedGenesFile}
                        setUploadedFile={setUploadedGenesFile}
                    />
                    <UploadButton label='Matrix' url='http://localhost:4001/upload/matrix' 
                        uploadedFile={uploadedMatrixFile}
                        setUploadedFile={setUploadedMatrixFile}
                    />
                </Button.Group>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color={allIsNotNull(uploads) ? 'blue' : undefined}
                    content={allIsNotNull(uploads) ? 'Confirm' : 'Close'} 
                    onClick={() => setOpenModal(false)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default UploadModal