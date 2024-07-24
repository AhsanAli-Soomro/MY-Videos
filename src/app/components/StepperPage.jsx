'use client'
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { styled } from '@mui/system';
import ChartjsViewsChart from './ChartjsViewsChart';
import HighchartsViewsChart from './HighchartsViewsChart';
import D3jsViewsChart from './D3jsViewsChart';
import ChartjsPlaytimeChart from './ChartjsPlaytimeChart';
import HighchartsPlaytimeChart from './HighchartsPlaytimeChart';
import D3jsPlaytimeChart from './D3jsPlaytimeChart';
import ChartjsLineChart from './ChartjsLineChart';
import HighchartsLineChart from './HighchartsLineChart';
import D3jsLineChart from './D3jsLineChart';

const viewSteps = ['Chart.js', 'Highcharts', 'D3.js'];
const playtimeSteps = ['Chart.js', 'Highcharts', 'D3.js'];
const lineChartSteps = ['Chart.js', 'Highcharts', 'D3.js'];

const CustomStepLabel = styled(StepLabel)(({ theme, active }) => ({
    cursor: 'pointer',
    color: active ? 'blue' : 'black',
    '& .MuiStepLabel-label': {
        color: active ? 'blue' : 'black',
    },
}));

const StepperPage = () => {
    const [activeViewStep, setActiveViewStep] = useState(0);
    const [activePlaytimeStep, setActivePlaytimeStep] = useState(0);
    const [activeLineChartStep, setActiveLineChartStep] = useState(0);

    const handleViewStepClick = (index) => {
        setActiveViewStep(index);
    };

    const handlePlaytimeStepClick = (index) => {
        setActivePlaytimeStep(index);
    };

    const handleLineChartStepClick = (index) => {
        setActiveLineChartStep(index);
    };

    const renderViewStepContent = (step) => {
        switch (step) {
            case 0:
                return <ChartjsViewsChart />;
            case 1:
                return <HighchartsViewsChart />;
            case 2:
                return <D3jsViewsChart />;
            default:
                return 'Unknown step';
        }
    };

    const renderPlaytimeStepContent = (step) => {
        switch (step) {
            case 0:
                return <ChartjsPlaytimeChart />;
            case 1:
                return <HighchartsPlaytimeChart />;
            case 2:
                return <D3jsPlaytimeChart />;
            default:
                return 'Unknown step';
        }
    };

    const renderLineChartStepContent = (step) => {
        switch (step) {
            case 0:
                return <ChartjsLineChart />;
            case 1:
                return <HighchartsLineChart />;
            case 2:
                return <D3jsLineChart />;
            default:
                return 'Unknown step';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row mb-8">
                <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-2xl font-bold mb-4 text-center">View Charts</h2>
                    <Stepper activeStep={activeViewStep} alternativeLabel>
                        {viewSteps.map((label, index) => (
                            <Step key={label} onClick={() => handleViewStepClick(index)}>
                                <CustomStepLabel active={activeViewStep === index} StepIconComponent={() => null}>
                                    {label}
                                </CustomStepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div className="mt-4">
                        {renderViewStepContent(activeViewStep)}
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-2xl font-bold mb-4 text-center">Playtime Charts</h2>
                    <Stepper activeStep={activePlaytimeStep} alternativeLabel>
                        {playtimeSteps.map((label, index) => (
                            <Step key={label} onClick={() => handlePlaytimeStepClick(index)}>
                                <CustomStepLabel active={activePlaytimeStep === index} StepIconComponent={() => null}>
                                    {label}
                                </CustomStepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div className="mt-4">
                        {renderPlaytimeStepContent(activePlaytimeStep)}
                    </div>
                </div>
            </div>
            <div className="w-full p-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Line Charts</h2>
                <Stepper activeStep={activeLineChartStep} alternativeLabel>
                    {lineChartSteps.map((label, index) => (
                        <Step key={label} onClick={() => handleLineChartStepClick(index)}>
                            <CustomStepLabel active={activeLineChartStep === index} StepIconComponent={() => null}>
                                {label}
                            </CustomStepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className="mt-4">
                    {renderLineChartStepContent(activeLineChartStep)}
                </div>
            </div>
        </div>
    );
};

export default StepperPage;
