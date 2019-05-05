import React, {useState, createRef, Fragment, useEffect} from 'react';

import {Menu, Popup, Header, Segment, Button, Grid, Modal, Label, Divider} from 'semantic-ui-react'

import ClusteringParameterMenu from '../cwl/clustering/ParameterMenu'


const CWLStepButton = ({
  step,
  icon
}) => {
  return (
    <Modal size='large'
      trigger={
        <Button icon={icon} content={step} />
      }
    >
      <Modal.Header content={step} />
      <Modal.Content scrolling>
        <ClusteringParameterMenu />
      </Modal.Content>
      <Modal.Actions>
        <Button content='Call API HERE'
          onClick={() => console.log('Submitted parameters')}
        />

      </Modal.Actions>
    </Modal>
  )
}


const MenuComponent = ({
  visContent,
  setVisContent
}) => {

  return (
        <Segment attached='bottom' style={{height: '10%'}} as={Menu} size='large'>
          <Menu.Item
            header
            icon='moon'
            content='CReSCENT'
          />

          <Menu.Menu position='right'>

          {
            [
              {step: 'Alignment', icon: 'align justify'},
              {step: 'Normalization', icon: 'align center'},
              {step: 'Clustering', icon: 'hubspot'}
            ].map(
              ({step, icon}) => (
                <Menu.Item key={step}>
                  <Button.Group>
                    <CWLStepButton step={step} icon={icon}
                      setVisContent={setVisContent}
                    />
                    <Popup
                      on='hover'
                      trigger={<Button icon='exclamation' color='blue' loading onClick={() => setVisContent(step)} />}
                      content='Click for results'
                    />
                  </Button.Group>
                </Menu.Item>
              )
            )
          }

            <Menu.Item />
            <Modal
              trigger={
                <Menu.Item>
                  <Button color='red' content='Upload' icon='upload' labelPosition='left'/>
                </Menu.Item>
              }
              header='Upload Workflow Inputs Here'
              content='Upload API stuff here'
              actions={
                [
                  <Button key='submit' content='Submit uploads' />
                ]
              }
            />
            <Menu.Item>
              <Button content='Submit' icon='cloud upload' labelPosition='left' color='blue' />
            </Menu.Item>
          </Menu.Menu>
        </Segment>
  )
}

export default MenuComponent