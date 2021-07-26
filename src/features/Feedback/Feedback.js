import React, { useState, useRef } from 'react';
import './Feedback.css';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import ReactGA from 'react-ga';

export function Feedback() {

    const formId = '7AQ5QzJv';
    const formSparkUrl = `https://submit-form.com/${formId}`;

    const recaptchaKey = '6LeM3sAbAAAAAE5Tuzf6S7Erh3i6lLcmpwwhx2Yv';
    const recaptchaRef = useRef();

    const initialFormState = {
        message: '',
        email: ''
    };

    const [formState, setFormState] = useState(initialFormState);
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState();
    const [recaptchaToken, setRecaptchaToken] = useState();

    const submitForm = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        await postSubmission();
        setSubmitting(false);
    };

    const postSubmission = async () => {
        const payload = {
            ...formState,
            "g-recaptcha-response": recaptchaToken
        };

        try {
            const result = await axios.post(formSparkUrl, payload)
            console.log(result);
            setSubmitMessage({
                text: 'Thanks for sharing!'
            });

            ReactGA.event({
                category: 'Feedback',
                action: 'User submitted feedback'
            });

            setFormState(initialFormState);
            recaptchaRef.current.reset();
        } catch(error) {
            console.log(error);
            setSubmitMessage({
                text: 'Sorry, there was a problem. Please try again or send us an email directly at wayvecollective@gmail.com'
            });
            ReactGA.event({
                category: 'Feedback',
                action: 'User ran into error trying to submit feedback'
            });
        }
    };

    const updateFormControl = (event) => {
        const { id, value } = event.target;
        const formKey = id;
        const updatedFormState = { ...formState };
        updatedFormState[formKey] = value;
        setFormState(updatedFormState);
    }

    const updateRecaptchaToken = (token) => {
        setRecaptchaToken(token);
    };

    return (
        <div className="Feedback">
            <p><span id="step">want to provide some feedback?</span> let us know what works and what doesn't and how we can better create tools to help you manage your well-being!</p>
            {submitMessage && <div className="SubmitMessage">{submitMessage.text}</div>}
            <form onSubmit={submitForm} data-netlify-recaptcha="true">
                <textarea onChange={updateFormControl} type="text" id="message" value={formState.message} placeholder=" message"></textarea>
                <label htmlFor="email">Would you like to provide your email to receive future updates from wayve?</label>
                <input onChange={updateFormControl} type="text" id="email" value={formState.email} placeholder=" email"></input>
                <ReCAPTCHA
                    id="recaptcha"
                    ref={recaptchaRef}
                    sitekey={recaptchaKey}
                    onChange={updateRecaptchaToken}
                />
                <button disabled={submitting} className="SubmitButton">
                    {submitting ? 'Submitting...' : 'Submt'}
                </button>
            </form>
        </div>
    )
}