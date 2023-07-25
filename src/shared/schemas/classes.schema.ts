import z from 'zod'

export const ClassesSchema = z.object({
  description: z.string().min(2, 'Слишком короткое'),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Некорректный формат даты'),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Некорректный формат даты'),
  open_for_enrollment: z.boolean({
    required_error: 'что то пошло не так',
    invalid_type_error: 'это не булевый тип',
  }),
  course_code: z.string(),
  branch_name: z.string(),
  course_name: z.string(),
})
