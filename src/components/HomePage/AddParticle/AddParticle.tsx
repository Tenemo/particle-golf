import React, { ReactElement, useState, SyntheticEvent } from 'react';
import { Modal, Button, Input, Header, Popup } from 'semantic-ui-react';
import { parse, derivative } from 'mathjs';
import { useTranslation } from 'react-i18next';

import styles from './addParticle.scss';

const isParsable = (expression: string): boolean => {
    try {
        parse(expression).compile().evaluate({ t: 1 });
        derivative(parse(expression), parse('t')).evaluate({
            t: 1,
        });
        return true;
    } catch (error) {
        return false;
    }
};

const getErrors = (expressions: {
    x: string;
    y: string;
    z: string;
}): { x: boolean; y: boolean; z: boolean } =>
    Object.entries(expressions).reduce(
        (acc, [name, expression]) => ({
            ...acc,
            [name]: !isParsable(expression),
        }),
        { x: false, y: false, z: false },
    );

const AddParticle = ({
    closeAddParticle,
    addParticle,
}: {
    closeAddParticle: () => void;
    addParticle: (expressions?: { x: string; y: string; z: string }) => void;
}): ReactElement => {
    const { t } = useTranslation();
    const [expressions, setExpressions] = useState({ x: '', y: '', z: '' });
    const onExpressionChange = ({
        currentTarget: { value, name },
    }: SyntheticEvent<HTMLInputElement>): void => {
        setExpressions({ ...expressions, [name]: value });
    };
    const errors = getErrors(expressions);
    const isFormValid =
        Object.values(errors).every((error) => !error) &&
        Object.values(expressions).every((expression) => expression);
    return (
        <Modal
            onClose={() => {
                closeAddParticle();
            }}
            open
        >
            <Modal.Header>{t('addParticle.addCustomParticle')}</Modal.Header>
            <Modal.Content>
                <div className={styles.modalContent}>
                    <Modal.Description>
                        <Header>{t('addParticle.rateOfChange')}</Header>
                        <div className={styles.expressionsInputs}>
                            <Popup
                                content={t('addParticle.notParsable')}
                                open={!!errors.x}
                                position="top right"
                                trigger={
                                    <Input
                                        error={errors.x}
                                        label="f(t)=x"
                                        name="x"
                                        onChange={onExpressionChange}
                                        value={expressions.x}
                                    />
                                }
                            />
                            <Popup
                                content={t('addParticle.notParsable')}
                                open={!!errors.y}
                                position="top right"
                                trigger={
                                    <Input
                                        error={errors.y}
                                        label="f(t)=y"
                                        name="y"
                                        onChange={onExpressionChange}
                                        value={expressions.y}
                                    />
                                }
                            />
                            <Popup
                                content={t('addParticle.notParsable')}
                                open={!!errors.z}
                                position="top right"
                                trigger={
                                    <Input
                                        error={errors.z}
                                        label="f(t)=z"
                                        name="z"
                                        onChange={onExpressionChange}
                                        value={expressions.z}
                                    />
                                }
                            />
                        </div>
                        <p
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: t('addParticle.description'),
                            }}
                        />
                        <Header>{t('addParticle.examples')}</Header>
                        <div className={styles.expression}>2 * 4</div>
                        <div className={styles.expression}>cos(4t)</div>
                        <div className={styles.expression}>
                            cos(t) + sin(2t) + 3cos(4t)^2
                        </div>
                        <div className={styles.expression}>sqrt(t) / 3</div>
                        <div className={styles.expression}>2t^2 + 3t - 1</div>
                        <div className={styles.expression}>t^3 - 20 + t</div>
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
                    {t('addParticle.cancel')}
                </Button>
                <Button
                    content={t('addParticle.add')}
                    disabled={!isFormValid}
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
