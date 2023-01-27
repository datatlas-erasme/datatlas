import { EntitySchema } from 'typeorm';
import { Project } from '@datatlas/shared/models'

export const ProjectSchema = new EntitySchema<Project>({
    name: 'Project',
    target: Project,
    columns: {
        id: {
            type: String,
            primary: true,
            generated: 'uuid',
        },
        name: {
            type: String,
            length: 255,
            nullable: true,
        },
        draft: {
            type: Boolean,
            nullable: true,
        }
    },

})
