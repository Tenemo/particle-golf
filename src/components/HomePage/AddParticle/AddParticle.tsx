import React, { ReactElement } from 'react';
import { Modal, Button } from 'semantic-ui-react';

const AddParticle = ({
    setIsAddParticleVisible,
}: {
    setIsAddParticleVisible: (isVisible: boolean) => void;
}): ReactElement => {
    return (
        <Modal
            onClose={() => {
                setIsAddParticleVisible(false);
            }}
            open
        >
            <Modal.Header>Add a custom particle</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <p>Custom function:</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="grey"
                    onClick={() => {
                        setIsAddParticleVisible(false);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    content="Add"
                    disabled
                    icon="plus"
                    labelPosition="right"
                    onClick={() => {
                        setIsAddParticleVisible(false);
                    }}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};

export default AddParticle;
