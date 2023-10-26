// script.js
const data = [
    { language: 'Telugu', value: 122 },
    { language: 'Spanish', value: 70 },
    { language: 'Korean', value: 56 },
    { language: 'Tamil', value: 43 },
    { language: 'Hindi', value: 34 },
    { language: 'Portuguese', value: 25 },
    { language: 'Russian', value: 18 },
    { language: 'Arabic', value: 14 }
];

const margin = { top: 40, right: 30, bottom: 70, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select('.chart-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
    .domain(data.map(d => d.language))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height, 0]);

// Add gridlines
svg.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.language))
    .attr('y', d => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.value))
    .on('mouseover', showTooltip)
    .on('mouseout', hideTooltip);

// Add labels
svg.append('g')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d.value)
    .attr('x', d => x(d.language) + x.bandwidth() / 2)
    .attr('y', d => y(d.value) - 5)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px');

// Add title
svg.append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .attr('font-size', '18px')
    .text('Language Popularity');

function showTooltip(d) {
    const tooltip = d3.select('.tooltip');
    tooltip
        .style('display', 'block')
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 50) + 'px')
        .html(`<strong>${d.language}</strong>: ${d.value}`);
}

function hideTooltip() {
    const tooltip = d3.select('.tooltip');
    tooltip.style('display', 'none');
}
