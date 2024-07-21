import http from "../http-common";
import IChartData from "../types/chart.types"

class MainDataService {
  getAll() {
    return http.get<Array<IChartData>>("/tutorials");
  }

  get(id: string) {
    return http.get<IChartData>(`/tutorials/${id}`);
  }

  create(data: IChartData) {
    return http.post<IChartData>("/tutorials", data);
  }

  update(data: IChartData, id: any) {
    return http.put<any>(`/tutorials/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/tutorials`);
  }

  findByTitle(title: string) {
    return http.get<Array<IChartData>>(`/tutorials?title=${title}`);
  }
}

export default new MainDataService();