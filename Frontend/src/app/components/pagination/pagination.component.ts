import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class PaginationComponent {
    @Input() totalPages = 1;
    @Input() currentPage = 1;
    @Output() pageChange = new EventEmitter<number>();

    pages: number[] = [];

    ngOnChanges() {
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    }

    goToPage(page: number) {
        if (page < 1 || page > this.totalPages) return;
        this.pageChange.emit(page);
    }
}
