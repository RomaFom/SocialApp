import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedService } from 'src/app/reducers/services/feed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">New Post</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <form #postForm="ngForm" (ngSubmit)="getLoginFormData(postForm.value)">
      <div class="flex justify-center">
        <div class="mb-3 mt-3 xl:w-96 h-96">
          <textarea
            ngModel
            id="post"
            name="post"
            placeholder="Your message"
            class="
                 h-full
                 block p-4 w-full
                 text-gray-900
                 bg-gray-50 rounded-lg border
                 border-gray-300 sm:text-md
                 focus:ring-blue-500
                 focus:border-blue-500
                 dark:bg-gray-700
                  dark:border-gray-600
                  dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500
                  "
          >
          </textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="submit"
          class="btn btn-outline-dark"
          (click)="activeModal.close('Close click')"
        >
          Submit
        </button>

        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="activeModal.close('Close click')"
        >
          Close
        </button>
      </div>
    </form>
  `,
})
export class NgbdModalContent {
  constructor(
    public activeModal: NgbActiveModal,
    private feed: FeedService,
    private router: Router
  ) {}

  getLoginFormData(data: any) {
    console.log(data);
    let token = localStorage.getItem('token');
    this.feed.setPost(token, data.post).subscribe((res) => {
      if (res.msg == 'Post added') {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }
    });
  }
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
  }
}
