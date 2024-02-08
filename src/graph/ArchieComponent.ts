import * as d3 from 'd3';
import { Selection } from 'd3';
import databaseSVG from '../images/database.svg'

/**
 * Defines possible sizes for Archie Components
 */
type ArchieComponentSize = "normal" | "wide"

/**
 * Position of the component
 */
interface ArchieComponentPosition {top: number, left: number}

/**
 * Properties of the component
 */
interface ArchieComponentProperties {
    icon: string        // Image to put as an icon, as a URL string. Get it like this: import databaseSVG from '../images/database.svg'
    label: string
    sublabel?: string

}

export class ArchieComponent {

    size: {width: number, height: number}
    position: ArchieComponentPosition
    properties: ArchieComponentProperties

    constructor(position: ArchieComponentPosition, properties: ArchieComponentProperties, size?: ArchieComponentSize) {
        this.position = position;
        this.size = ArchieComponent.getDimensions(size ? size : "normal");
        this.properties = properties;
    }

    static getDimensions(size: ArchieComponentSize) {
        if (size == "normal") return {width: 140, height: 150}
        else if (size == 'wide') return {width: 300, height: 150}

        return {width: 140, height: 150}
    }

    getDimensions() {
        return this.size
    }

    async render(svg: Selection<SVGSVGElement, unknown, HTMLElement, any>, graphContainer: React.MutableRefObject<null>) {

        if (!graphContainer.current) return;

        const component_topleft_x = this.position.left;
        const component_topleft_y = this.position.top;

        const component_width = this.size.width;
        const component_height = this.size.height;

        // Draw the rectangle
        svg.append('rect')
            .attr('width', component_width)
            .attr('height', component_height)
            .attr('x', component_topleft_x)
            .attr('y', component_topleft_y)
            .attr('class', 'archie-d3-component');

        svg.append('circle')
            .attr('cx', component_topleft_x + component_width/2 )
            .attr('cy', component_topleft_y + component_height/3)
            .attr('r', 24)
            .attr('fill', '#dfe2ea')
            .attr('class', 'archie-icon-circle')

        const svgContent = await d3.text(this.properties.icon);

        d3.select(graphContainer.current).append('div')
            .style('top', `${component_topleft_y + component_height / 3 - 12}px`)
            .style('left', `${component_topleft_x + component_width / 2 - 12}px`)
            .style('fill', 'var(--background-color)')
            .attr('class', 'archie-component-icon')
            .html(svgContent)

        svg.append('text')
            .attr('x', `${component_topleft_x + component_width / 2}px`)
            .attr('y', `${component_topleft_y + 12 + component_height * 2 / 3}px`)
            .attr('text-anchor', 'middle')
            .attr('width', component_width)
            .attr('class', 'archie-component-label')
            .text(this.properties.label)

        if (this.properties.sublabel) {

            svg.append('text')
                .attr('x', `${component_topleft_x + component_width / 2}px`)
                .attr('y', `${component_topleft_y + 12 + 20 + component_height * 2 / 3}px`)
                .attr('text-anchor', 'middle')
                .attr('width', component_width)
                .attr('class', 'archie-component-sublabel')
                .text(this.properties.sublabel)
        }

    }

}