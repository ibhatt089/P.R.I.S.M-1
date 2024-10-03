import { getRepository } from "typeorm";
import { Task } from "../entities/Task";
import { BaseModel } from "../shared/BaseModel";

export class TaskService extends BaseModel<Task> {
  constructor() {
    super(Task);
  }

  private taskRepository = getRepository(Task);

  /**
   * @method getTaskById
   * @description Retrieves a task by its ID.
   * @param {string} id - The ID of the task.
   * @returns {Promise<Task | null>} - The found task or null if not found.
   */
  public async getTaskById(id: string): Promise<Task | undefined> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  /**
   * @method createTask
   * @description Creates a new task.
   * @param {Partial<Task>} taskData - The data to create the task.
   * @returns {Promise<Task>} - The newly created task.
   */
  public async createTask(taskData: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(taskData);
    return await this.taskRepository.save(newTask);
  }

  /**
   * @method updateTask
   * @description Updates an existing task.
   * @param {string} id - The ID of the task to update.
   * @param {Partial<Task>} updateData - The new data for the task.
   * @returns {Promise<Task>} - The updated task.
   */
  public async updateTask(
    id: string,
    updateData: Partial<Task>
  ): Promise<Task | undefined> {
    await this.taskRepository.update(id, updateData);
    return await this.getTaskById(id);
  }

  /**
   * @method deleteTask
   * @description Deletes a task by its ID.
   * @param {string} id - The ID of the task to delete.
   * @returns {Promise<void>} - Resolves when the task has been deleted.
   */
  public async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  public async listTasks(): Promise<Task[]> {
    return await this.findAll();
  }
}
