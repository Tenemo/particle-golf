import React, { ReactElement, useState, SyntheticEvent } from 'react';
import { Modal, Button, Input, Header } from 'semantic-ui-react';

import styles from './addParticle.scss';

const AddParticle = ({
    closeAddParticle,
    addParticle,
}: {
    closeAddParticle: () => void;
    addParticle: (expressions?: { x: string; y: string; z: string }) => void;
}): ReactElement => {
    const [expressions, setExpressions] = useState({ x: '', y: '', z: '' });
    const onExpressionChange = ({
        currentTarget: { value, name },
    }: SyntheticEvent<HTMLInputElement>): void => {
        setExpressions({ ...expressions, [name]: value });
    };
    return (
        <Modal
            onClose={() => {
                closeAddParticle();
            }}
            open
        >
            <Modal.Header>Add a custom particle</Modal.Header>
            <Modal.Content>
                <div className={styles.modalContent}>
                    <Modal.Description>
                        <Header>Rates of change in each direction:</Header>
                        <div className={styles.expressionsInputs}>
                            <Input
                                label="(x) i"
                                name="x"
                                onChange={onExpressionChange}
                                value={expressions.x}
                            />
                            <Input
                                label="(y) j"
                                name="y"
                                onChange={onExpressionChange}
                                value={expressions.y}
                            />
                            <Input
                                label="(z) k"
                                name="z"
                                onChange={onExpressionChange}
                                value={expressions.z}
                            />
                        </div>
                        <p>
                            <span>t</span> is the only variable allowed.
                            Expressions parsable by{' '}
                            <a
                                href="https://mathjs.org/docs/expressions/parsing.html"
                                rel="noreferrer"
                                target="_blank"
                            >
                                math.js
                            </a>{' '}
                            are supported. Each expression for every direction
                            is calculated during frame render with current time
                            in seconds substituted for <span>t</span>. The
                            particle&apos;s position on every axis is then
                            updated according to the results from the above
                            expressions.
                        </p>
                        <Header>Examples:</Header>
                        <div className={styles.expression}>2*4</div>
                        <div className={styles.expression}>sqrt(t)/3</div>
                        <div className={styles.expression}>2t^2+3t-1</div>
                        <div className={styles.expression}>t^3 % 20 + t</div>
                    </Modal.Description>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="grey"
                    onClick={() => {
                        closeAddParticle();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    content="Add"
                    icon="plus"
                    labelPosition="right"
                    onClick={() => {
                        addParticle(expressions);
                        closeAddParticle();
                    }}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};

export default AddParticle;
